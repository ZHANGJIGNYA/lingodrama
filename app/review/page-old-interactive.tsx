'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import type { InteractiveScript, InteractiveScenario, Vocabulary } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { getTodayReviewWords, calculateNextReview } from '@/lib/spaced-repetition'
import { getMockInteractiveScript } from '@/lib/mockInteractiveScenarios'
import ProjectorLoading from '@/components/ProjectorLoading'

export default function InteractiveReviewPage() {
  const { userSettings, vocabularyList, setVocabularyList } = useAppStore()

  const [script, setScript] = useState<InteractiveScript | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showProjector, setShowProjector] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  const [reviewedWords, setReviewedWords] = useState<string[]>([])

  const [isStarted, setIsStarted] = useState(false)
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const currentScenario = script?.scenarios[currentScenarioIndex]
  const isComplete = script ? currentScenarioIndex === script.scenarios.length - 1 && showFeedback : false

  // 生成AI剧本
  const generateScript = async () => {
    setIsGenerating(true)
    setGenerationError(null)

    try {
      const wordsPerReview = userSettings?.words_per_review || 3
      const wordsToReview = getTodayReviewWords(vocabularyList).slice(0, wordsPerReview)

      if (wordsToReview.length === 0) {
        setGenerationError('⚠️ No words to review today. Using demo scenario.')

        const genre = (userSettings?.genre_preference === 'mixed'
          ? (['romance', 'workplace', 'slice_of_life'] as const)[Math.floor(Math.random() * 3)]
          : (userSettings?.genre_preference || 'romance')) as 'romance' | 'workplace' | 'slice_of_life'

        const mockScript = getMockInteractiveScript(genre)
        setScript(mockScript)
        setIsGenerating(false)
        return
      }

      const genre = userSettings?.genre_preference === 'mixed'
        ? (['romance', 'workplace', 'slice_of_life'] as const)[Math.floor(Math.random() * 3)]
        : (userSettings?.genre_preference || 'romance') as 'romance' | 'workplace' | 'slice_of_life'

      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: wordsToReview.map(v => ({ word: v.word, definition: v.definition })),
          genre,
          userSettings,
        }),
      })

      if (!response.ok) {
        throw new Error('API request failed')
      }

      const data = await response.json()

      const generatedScript: InteractiveScript = {
        id: `interactive-${Date.now()}`,
        user_id: userSettings?.user_id || 'mock',
        vocabulary_ids: wordsToReview.map(v => v.id),
        genre,
        scenarios: data.script.scenarios,
        created_at: new Date().toISOString(),
      }

      setScript(generatedScript)
      setReviewedWords(wordsToReview.map(v => v.id))
    } catch (error: any) {
      console.error('❌ Script generation error:', error)
      setGenerationError('⚠️ AI generation failed. Using demo scenario.')

      // Fallback to mock data
      const genre = (userSettings?.genre_preference === 'mixed'
        ? (['romance', 'workplace', 'slice_of_life'] as const)[Math.floor(Math.random() * 3)]
        : (userSettings?.genre_preference || 'romance')) as 'romance' | 'workplace' | 'slice_of_life'

      const mockScript = getMockInteractiveScript(genre)
      setScript(mockScript)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStart = async () => {
    setShowProjector(true)
    if (!script) {
      await generateScript()
    }
    // 放映机动画播放3.5秒后再显示内容
    setTimeout(() => {
      setShowProjector(false)
      setIsStarted(true)
    }, 3500)
  }

  const handleChoice = (choiceId: string) => {
    if (showFeedback || !currentScenario) return

    setSelectedChoice(choiceId)
    const choice = currentScenario.choices.find(c => c.id === choiceId)
    setIsCorrect(choice?.is_correct || false)
    setShowFeedback(true)
  }

  const handleNext = () => {
    if (currentScenarioIndex < (script?.scenarios.length || 0) - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1)
      setSelectedChoice(null)
      setShowFeedback(false)
      setIsCorrect(null)
    } else {
      // 完成复习，更新词汇数据
      completeReview()
    }
  }

  const completeReview = () => {
    if (!script || reviewedWords.length === 0) return

    const updatedVocabulary = vocabularyList.map((word) => {
      if (reviewedWords.includes(word.id)) {
        const reviewData = calculateNextReview(word.review_count, 4, word.easiness_factor, word.interval)
        return { ...word, ...reviewData, updated_at: new Date().toISOString() }
      }
      return word
    })

    setVocabularyList(updatedVocabulary)
  }

  // 放映机加载动画
  if (showProjector) {
    return <ProjectorLoading />
  }

  // 启动页
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black flex items-center justify-center px-6 film-grain vignette">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-7xl mb-6"
          >
            🎭
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Interactive Theater
          </h1>

          <p className="text-gray-300 mb-8">
            Make choices. Learn words. Change the story.
          </p>

          {generationError && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-200">{generationError}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            disabled={isGenerating}
            className={`bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto transition-all shadow-2xl ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                Begin
              </>
            )}
          </motion.button>

          {vocabularyList.length === 0 && (
            <p className="text-xs text-gray-500 mt-6">
              💡 Add words in Vault first
            </p>
          )}
        </motion.div>
      </div>
    )
  }

  // 互动场景页面
  if (!currentScenario) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black film-grain vignette">
      <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* 头部进度 */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-white">
            <div className="text-sm text-gray-400">Scenario</div>
            <div className="text-2xl font-bold">
              {currentScenarioIndex + 1} / {script?.scenarios.length}
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* 场景内容 */}
        <motion.div
          key={currentScenarioIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col"
        >
          {/* 目标单词 */}
          <div className="bg-purple-600/20 border border-purple-500/50 rounded-xl p-4 mb-6">
            <div className="text-sm text-purple-300 mb-1">Target Word</div>
            <div className="text-3xl font-bold text-white tracking-wider">
              {currentScenario.target_word}
            </div>
          </div>

          {/* 场景描述 */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-6 shadow-2xl">
            <p className="text-lg text-white leading-relaxed mb-4">
              {currentScenario.context}
            </p>

            {/* 上下文辅助 */}
            {currentScenario.context_aids && currentScenario.context_aids.length > 0 && (
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="text-xs text-gray-400 mb-2">💡 Helpful Notes:</div>
                {currentScenario.context_aids.map((aid, index) => (
                  <div key={index} className="text-sm text-gray-300">
                    <span className="font-semibold">{aid.word}</span>: {aid.explanation}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 选项 */}
          <div className="space-y-3 mb-6">
            <div className="text-sm text-gray-400 mb-3">What do you do?</div>
            <AnimatePresence>
              {currentScenario.choices.map((choice, index) => {
                const isSelected = selectedChoice === choice.id
                const isRightChoice = choice.is_correct
                const showResult = showFeedback && isSelected

                return (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleChoice(choice.id)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showResult
                        ? isRightChoice
                          ? 'bg-green-600/30 border-green-500 shadow-lg shadow-green-500/50'
                          : 'bg-red-600/30 border-red-500 shadow-lg shadow-red-500/50'
                        : isSelected
                        ? 'bg-purple-600/30 border-purple-500'
                        : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showResult
                          ? isRightChoice
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-white/10 text-white'
                      }`}>
                        {showResult ? (
                          isRightChoice ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <div className="flex-1 text-white font-medium">
                        {choice.text}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>

          {/* 反馈 */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-6 mb-6 ${
                  isCorrect
                    ? 'bg-green-600/20 border border-green-500/50'
                    : 'bg-red-600/20 border border-red-500/50'
                }`}
              >
                <div className={`text-xl font-bold mb-3 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                  {isCorrect ? '✅ Correct!' : '❌ Wrong Choice'}
                </div>
                <div className="text-white text-sm leading-relaxed">
                  {isCorrect ? currentScenario.success_feedback : currentScenario.failure_feedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 底部按钮 */}
        {showFeedback && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-2xl ${
              isComplete
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {isComplete ? (
              <>✅ Complete Review</>
            ) : (
              <>
                Next Scenario
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  )
}
