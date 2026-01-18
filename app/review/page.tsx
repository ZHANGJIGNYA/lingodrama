'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, ChevronRight } from 'lucide-react'
import type { ChatScript, ChatMessage, HighlightedWord, Vocabulary } from '@/lib/types'
import { romanceReviewScript, workplaceReviewScript, sliceOfLifeReviewScript } from '@/lib/mockStories'
import { useAppStore } from '@/lib/store'
import { getTodayReviewWords, calculateNextReview } from '@/lib/spaced-repetition'

// 根据题材选择脚本
const getScriptByGenre = (genre: string): ChatScript => {
  switch (genre) {
    case 'romance':
      return romanceReviewScript
    case 'workplace':
      return workplaceReviewScript
    case 'slice_of_life':
      return sliceOfLifeReviewScript
    default:
      return romanceReviewScript
  }
}

// 随机选择题材（用于 mixed 模式）
const getRandomGenre = (): 'romance' | 'workplace' | 'slice_of_life' => {
  const genres: Array<'romance' | 'workplace' | 'slice_of_life'> = ['romance', 'workplace', 'slice_of_life']
  return genres[Math.floor(Math.random() * genres.length)]
}

// 渲染带高亮的文本
function HighlightedText({
  content,
  highlightedWords,
  userSettings
}: {
  content: string
  highlightedWords?: HighlightedWord[]
  userSettings: any
}) {
  if (!highlightedWords || highlightedWords.length === 0) {
    return <>{content}</>
  }

  let result = content
  const elements: React.ReactNode[] = []
  let lastIndex = 0

  // 过滤掉不应该高亮的常见词
  const commonWords = ['my', 'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'can', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from', 'as', 'it', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they']

  const validHighlightedWords = highlightedWords.filter(hw =>
    !commonWords.includes(hw.word.toLowerCase())
  )

  validHighlightedWords.forEach((hw, index) => {
    const wordIndex = result.toLowerCase().indexOf(hw.word.toLowerCase(), lastIndex)

    if (wordIndex !== -1) {
      // 添加前面的普通文本
      if (wordIndex > lastIndex) {
        elements.push(
          <span key={`text-${index}`}>
            {result.substring(lastIndex, wordIndex)}
          </span>
        )
      }

      // 根据用户设置选择释义
      const definition = userSettings?.definition_preference === 'simple_english'
        ? hw.definition_simple_english
        : hw.definition_native

      // 添加高亮的单词
      const highlightClass = `highlight-${hw.style}`
      elements.push(
        <span
          key={`highlight-${index}`}
          className={highlightClass}
          data-definition={definition}
        >
          {result.substring(wordIndex, wordIndex + hw.word.length)}
        </span>
      )

      lastIndex = wordIndex + hw.word.length
    }
  })

  // 添加剩余的文本
  if (lastIndex < result.length) {
    elements.push(<span key="text-end">{result.substring(lastIndex)}</span>)
  }

  return <>{elements}</>
}

// 消息气泡组件
function MessageBubble({
  message,
  index,
  userSettings
}: {
  message: ChatMessage
  index: number
  userSettings: any
}) {
  // 判断是否是旁白类型（narration, thoughts, system等）
  const isNarration =
    message.speaker === 'Narration' ||
    message.speaker === 'Your thoughts' ||
    message.speaker === 'System' ||
    message.speaker.includes('whisper')
  const isUser = message.is_user

  if (isNarration) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.3 }}
        className="flex justify-center my-3"
      >
        <div className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 max-w-[85%] text-center shadow-sm">
          <p className="text-xs text-gray-600 dark:text-gray-400 italic">
            <HighlightedText
              content={message.content}
              highlightedWords={message.highlighted_words}
              userSettings={userSettings}
            />
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div className="max-w-[80%]">
        {!isUser && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 ml-3">{message.speaker}</p>
        )}
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-md'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-md'
          }`}
        >
          <p className="text-[15px] leading-relaxed">
            <HighlightedText
              content={message.content}
              highlightedWords={message.highlighted_words}
              userSettings={userSettings}
            />
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReviewPage() {
  const { userSettings, vocabularyList, setVocabularyList } = useAppStore()

  // 根据用户设置决定初始题材
  const getInitialGenre = (): 'romance' | 'workplace' | 'slice_of_life' => {
    if (!userSettings) return 'romance'

    const preference = userSettings.genre_preference

    // 如果是 mixed 或 mystery（暂无数据），随机选择
    if (preference === 'mixed' || preference === 'mystery') {
      return getRandomGenre()
    }

    // 否则使用用户设定的题材
    return preference as 'romance' | 'workplace' | 'slice_of_life'
  }

  // 当前题材（从用户设置读取）
  const [currentGenre, setCurrentGenre] = useState<'romance' | 'workplace' | 'slice_of_life'>(getInitialGenre())
  const [script, setScript] = useState<ChatScript | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [reviewedWords, setReviewedWords] = useState<string[]>([]) // 本次复习的单词ID

  const [isStarted, setIsStarted] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayedMessages])

  // 完成复习后更新单词数据
  const completeReview = () => {
    if (!script || reviewedWords.length === 0) return

    console.log('🎯 Completing review for words:', reviewedWords)

    const updatedVocabulary = vocabularyList.map((word) => {
      if (reviewedWords.includes(word.id)) {
        // 假设用户记住了（quality = 4）
        // 实际应用中可以让用户评分
        const reviewData = calculateNextReview(
          word.review_count,
          4, // 记忆质量：4 = 正确，有点犹豫
          word.easiness_factor,
          word.interval
        )

        console.log(`✅ Updated ${word.word}:`, {
          old: { review_count: word.review_count, mastery: word.mastery_level, next: word.next_review_date },
          new: reviewData,
        })

        return {
          ...word,
          ...reviewData,
          updated_at: new Date().toISOString(),
        }
      }
      return word
    })

    setVocabularyList(updatedVocabulary)
    console.log('💾 Vocabulary updated!')
  }

  // 生成AI剧本
  const generateScript = async (genre: 'romance' | 'workplace' | 'slice_of_life') => {
    setIsGenerating(true)
    setGenerationError(null)

    try {
      console.log('📚 Total vocabulary in store:', vocabularyList.length)
      console.log('📋 Vocabulary list:', vocabularyList.map(v => `${v.word} (mastery: ${v.mastery_level}%, next: ${v.next_review_date})`))

      // 使用艾宾浩斯算法获取今日待复习单词
      const wordsPerReview = userSettings?.words_per_review || 3
      const wordsToReview = getTodayReviewWords(vocabularyList).slice(0, wordsPerReview)

      console.log('⚙️ Words per review setting:', wordsPerReview)
      console.log('⏰ Words due for review today:', wordsToReview.length)
      console.log('📝 Selected words:', wordsToReview.map(v => v.word))

      // 如果没有待复习的单词，使用 Mock 数据
      if (wordsToReview.length === 0) {
        console.log('⚠️ No words to review, using mock script')
        setGenerationError(`⚠️ No words to review today. ${vocabularyList.length > 0 ? 'All words mastered! 🎉' : 'Add words in Vault first.'}`)
        const mockScript = getScriptByGenre(genre)
        setScript(mockScript)
        setIsGenerating(false)
        return
      }

      console.log(`🎬 Generating script for ${wordsToReview.length} words:`, wordsToReview.map(w => w.word))

      // 调用 API 生成剧本
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          words: wordsToReview.map(v => ({
            word: v.word,
            definition: v.definition,
          })),
          genre,
          userSettings,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'API request failed')
      }

      const data = await response.json()

      // 清理并验证消息
      const cleanedMessages = data.script.messages.map((msg: ChatMessage, index: number) => {
        const originalContent = msg.content
        const cleanedContent = msg.content
          .replace(/<span[^>]*>/gi, '')
          .replace(/<\/span>/gi, '')
          .replace(/<[^>]+>/g, '') // 移除所有HTML标签
          .replace(/\s+/g, ' ') // 规范化空格
          .trim()

        // 如果检测到HTML标签，记录警告
        if (originalContent !== cleanedContent) {
          console.warn(`⚠️ Message ${index + 1} contained HTML tags (cleaned):`)
          console.warn(`   Original: "${originalContent}"`)
          console.warn(`   Cleaned:  "${cleanedContent}"`)
        }

        return {
          ...msg,
          content: cleanedContent
        }
      })

      // 构建完整的 ChatScript 对象
      const generatedScript: ChatScript = {
        id: `generated-${Date.now()}`,
        user_id: userSettings?.user_id || 'mock',
        vocabulary_ids: wordsToReview.map(v => v.id),
        genre,
        messages: cleanedMessages,
        background_image_url: getScriptByGenre(genre).background_image_url,
        created_at: new Date().toISOString(),
      }

      console.log(`✅ Script generated successfully with ${data.provider || 'AI'}!`)
      if (data.provider === 'gemini') {
        console.log('💡 Used Gemini API (backup provider)')
      }

      setScript(generatedScript)
      setReviewedWords(wordsToReview.map(v => v.id)) // 保存本次复习的单词
    } catch (error: any) {
      console.error('❌ Script generation error:', error)

      // 更详细的错误信息
      let errorMsg = '⚠️ AI generation failed. Using demo story.'

      if (error.message?.includes('API key')) {
        errorMsg = '🔑 API key not configured. Add your key to .env.local'
      } else if (error.message?.includes('Connection') || error.message?.includes('fetch')) {
        errorMsg = '🌐 Network error. Check your internet connection.'
      } else if (error.message?.includes('负载') || error.message?.includes('limit') || error.message?.includes('overload')) {
        errorMsg = '⏳ Claude API is busy. Trying backup model or using demo story...'
      } else if (error.message?.includes('401') || error.message?.includes('无效')) {
        errorMsg = '🔑 Invalid API key. Check .env.local file.'
      } else if (error.message?.includes('All models failed')) {
        errorMsg = '😔 All AI models are busy. Using demo story. Try again in a few minutes.'
      }

      setGenerationError(errorMsg)

      // 失败时使用 Mock 数据
      const mockScript = getScriptByGenre(genre)
      setScript(mockScript)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStart = async () => {
    // 如果还没有剧本，先生成
    if (!script) {
      await generateScript(currentGenre)
    }

    setIsStarted(true)
    setCurrentMessageIndex(0)

    if (script) {
      setDisplayedMessages([script.messages[0]])
    }
  }

  const handleNext = () => {
    if (script && currentMessageIndex < script.messages.length - 1) {
      const nextIndex = currentMessageIndex + 1
      setCurrentMessageIndex(nextIndex)
      setDisplayedMessages([...displayedMessages, script.messages[nextIndex]])

      // 如果到达最后一条消息，标记复习完成
      if (nextIndex === script.messages.length - 1) {
        console.log('🎉 Review completed!')
        completeReview()
      }
    }
  }

  const handleRestart = () => {
    setCurrentMessageIndex(0)
    if (script) {
      setDisplayedMessages([script.messages[0]])
    }
  }

  const handleChangeGenre = async (genre: 'romance' | 'workplace' | 'slice_of_life') => {
    setCurrentGenre(genre)
    setScript(null) // 清空当前剧本
    setIsStarted(false)
    setCurrentMessageIndex(0)
    setDisplayedMessages([])
    // 生成新剧本
    await generateScript(genre)
  }

  const isComplete = script ? currentMessageIndex === script.messages.length - 1 : false

  // 题材配色
  const genreTheme = {
    romance: {
      bg: 'from-pink-500/20 to-purple-500/20',
      accent: 'text-pink-500',
      label: '💘 恋爱',
    },
    workplace: {
      bg: 'from-blue-500/20 to-cyan-500/20',
      accent: 'text-blue-500',
      label: '💼 职场',
    },
    slice_of_life: {
      bg: 'from-green-500/20 to-emerald-500/20',
      accent: 'text-green-500',
      label: '🌿 生活',
    },
  }

  const theme = genreTheme[currentGenre]

  // 启动页面
  if (!isStarted) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-md w-full"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-6xl mb-6"
          >
            🎬
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Immersive Theater</h1>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Genre</p>
            <p className="text-gray-900 dark:text-white font-semibold">{theme.label}</p>
          </div>

          {/* 题材选择 */}
          <div className="mb-6 space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Select Genre</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(genreTheme) as Array<keyof typeof genreTheme>).map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleChangeGenre(genre)}
                  disabled={isGenerating}
                  className={`py-2 px-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    currentGenre === genre
                      ? 'bg-blue-500 border-blue-500 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-400'
                  } ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {genreTheme[genre].label}
                </button>
              ))}
            </div>
          </div>

          {/* 词汇信息 */}
          {script && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-2xl p-3 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                📖 Review {script.vocabulary_ids.length} words
              </p>
            </div>
          )}

          {/* 复习设置提示 */}
          {!script && !isGenerating && (
            <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-3 mb-6">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                ⚙️ Words per session: {userSettings?.words_per_review || 3} (Change in Settings)
              </p>
            </div>
          )}

          {/* 错误提示 */}
          {generationError && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-2xl p-3 mb-6">
              <p className="text-sm text-red-700 dark:text-red-300">{generationError}</p>
            </div>
          )}

          {/* 开始按钮 */}
          <motion.button
            whileHover={{ scale: isGenerating ? 1 : 1.05 }}
            whileTap={{ scale: isGenerating ? 1 : 0.95 }}
            onClick={handleStart}
            disabled={isGenerating}
            className={`bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto transition-all shadow-lg ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 shadow-blue-500/30'
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start Theater
              </>
            )}
          </motion.button>

          {/* 提示 */}
          {vocabularyList.length === 0 && !isGenerating && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              💡 Add words in Vault to generate personalized stories
            </p>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 头部 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">{theme.label}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {currentMessageIndex + 1} / {script?.messages.length || 0}
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* 消息区域 */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 pb-32 bg-gray-50 dark:bg-gray-900"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          {script ? (
            <AnimatePresence>
              {displayedMessages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  index={index}
                  userSettings={userSettings}
                />
              ))}
            </AnimatePresence>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              Loading script...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent pt-8 pb-2">
        <div className="max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={isComplete || !script}
            className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
              isComplete
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } ${!script ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isComplete ? (
              <>✅ Review Completed</>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
