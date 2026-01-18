'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Loader2, Trash2, Tag } from 'lucide-react'
import type { Vocabulary } from '@/lib/types'
import { useAppStore } from '@/lib/store'

// Mock 已添加的单词
const mockVocabulary: Vocabulary[] = [
  {
    id: '1',
    user_id: 'mock',
    word: 'elastic',
    definition: '有弹性的；灵活的',
    part_of_speech: 'adjective',
    example_sentence: 'The elastic band stretched easily.',
    difficulty_level: 3,
    emotional_intensity: 'vibe',
    tags: ['physical', 'property'],
    next_review_date: new Date().toISOString(),
    review_count: 0,
    mastery_level: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'mock',
    word: 'cynical',
    definition: '愤世嫉俗的；悲观的',
    part_of_speech: 'adjective',
    example_sentence: 'He had a cynical view of politics.',
    difficulty_level: 4,
    emotional_intensity: 'social',
    tags: ['emotion', 'personality'],
    next_review_date: new Date().toISOString(),
    review_count: 2,
    mastery_level: 35,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'mock',
    word: 'critical',
    definition: '危急的；关键的',
    part_of_speech: 'adjective',
    example_sentence: 'The patient is in critical condition.',
    difficulty_level: 3,
    emotional_intensity: 'critical',
    tags: ['medical', 'emergency'],
    next_review_date: new Date().toISOString(),
    review_count: 5,
    mastery_level: 68,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function VaultPage() {
  const { vocabularyList, setVocabularyList } = useAppStore()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // 使用 Zustand store 的数据，如果为空则使用 mock 数据
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>(
    vocabularyList.length > 0 ? vocabularyList : mockVocabulary
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)

    // 模拟 AI 处理延迟
    setTimeout(() => {
      const words = input
        .split(/[,，\s]+/)
        .map(w => w.trim())
        .filter(w => w.length > 0)

      // 创建新的单词条目
      const newVocabulary: Vocabulary[] = words.map((word, index) => ({
        id: `new-${Date.now()}-${index}`,
        user_id: 'mock',
        word: word,
        definition: '待 AI 分析...', // 后续接入 Claude API
        part_of_speech: 'unknown',
        example_sentence: '',
        difficulty_level: 1,
        emotional_intensity: 'vibe',
        tags: [],
        next_review_date: new Date().toISOString(), // 立即可复习
        review_count: 0,
        mastery_level: 0,
        easiness_factor: 2.5, // SM-2 默认值
        interval: 0, // 第一次复习
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      // 添加到本地 state
      const updatedVocabulary = [...newVocabulary, ...vocabulary]
      setVocabulary(updatedVocabulary)

      // 同步到 Zustand store
      setVocabularyList(updatedVocabulary)

      console.log('✅ Added words to Vault:', words)
      console.log('📚 Total vocabulary count:', updatedVocabulary.length)

      alert(`✅ Added ${words.length} word(s): ${words.join(', ')}\n\n📖 Total: ${updatedVocabulary.length} words\n💡 Go to Review page to generate AI stories!`)

      setInput('')
      setIsLoading(false)
    }, 1500)
  }

  const handleDelete = (id: string) => {
    const updatedVocabulary = vocabulary.filter(v => v.id !== id)
    setVocabulary(updatedVocabulary)
    setVocabularyList(updatedVocabulary)
  }

  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'text-success'
    if (level >= 50) return 'text-warning'
    return 'text-muted-foreground'
  }

  const getIntensityBadge = (intensity?: string) => {
    const config = {
      critical: { label: '生死时速', color: 'bg-destructive/20 text-destructive' },
      social: { label: '社交排雷', color: 'bg-primary/20 text-primary' },
      vibe: { label: '审美鉴定', color: 'bg-success/20 text-success' },
    }
    const badge = config[intensity as keyof typeof config]
    if (!badge) return null

    return (
      <span className={`text-xs px-2 py-1 rounded ${badge.color}`}>
        {badge.label}
      </span>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-sm">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          📥 词汇金库
        </h1>
        <p className="text-muted-foreground">
          批量录入单词，AI 自动分析
        </p>
      </motion.header>

      {/* 输入表单 */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="mb-8"
      >
        <div className="bg-card border border-border rounded-lg p-4">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            输入单词（用逗号或空格分隔）
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如：elastic, cynical, vibrant"
            className="w-full bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
            disabled={isLoading}
          />

          <motion.button
            type="submit"
            disabled={isLoading || !input.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-3 w-full bg-primary text-primary-foreground rounded-lg py-3 px-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                AI 分析中...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                添加到金库
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      {/* 词汇列表 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            已收录 {vocabulary.length} 个单词
          </h2>
        </div>

        <AnimatePresence>
          {vocabulary.map((word, index) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-foreground">
                      {word.word}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {word.part_of_speech}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {word.definition}
                  </p>
                  {word.example_sentence && (
                    <p className="text-xs text-muted-foreground italic">
                      "{word.example_sentence}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(word.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mt-3">
                {getIntensityBadge(word.emotional_intensity)}

                {word.tags.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {word.tags.slice(0, 2).join(', ')}
                    </span>
                  </div>
                )}

                <div className="ml-auto">
                  <span className={`text-xs font-medium ${getMasteryColor(word.mastery_level)}`}>
                    掌握度 {word.mastery_level}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
