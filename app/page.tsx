'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, X, Camera, ArrowUp, Feather } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import type { Vocabulary } from '@/lib/types'

// 剧本海报数据
const genrePosters = [
  {
    id: 'revenge',
    title: "The CEO's Lie",
    tag: 'REVENGE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
  },
  {
    id: 'mystery',
    title: 'Neon Rain',
    tag: 'MYSTERY',
    image: 'https://images.unsplash.com/photo-1515266591878-5a0448f2c354?w=300',
  },
  {
    id: 'romance',
    title: "Dragon's Pact",
    tag: 'ROMANCE',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300',
  },
]

// Streak 热力图生成
function generateHeatmap() {
  return Array.from({ length: 28 }, () => {
    const rand = Math.random()
    if (rand > 0.6) return rand > 0.8 ? 3 : 2
    return rand > 0.5 ? 1 : 0
  })
}

export default function HomePage() {
  const router = useRouter()
  const { vocabularyList, setVocabularyList } = useAppStore()

  const [wordInput, setWordInput] = useState('')
  const [pendingWords, setPendingWords] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState(genrePosters[0].id)
  const [showStreakOverlay, setShowStreakOverlay] = useState(false)
  const [heatmapData, setHeatmapData] = useState<number[]>([])
  const [currentStreak] = useState(12)

  useEffect(() => {
    setHeatmapData(generateHeatmap())
  }, [])

  // 添加单词到 GREEN ROOM
  const handleAddWord = () => {
    const trimmed = wordInput.trim()
    if (trimmed && !pendingWords.includes(trimmed)) {
      setPendingWords([...pendingWords, trimmed])
      setWordInput('')
    }
  }

  // 删除待添加的单词
  const handleRemoveWord = (index: number) => {
    setPendingWords(pendingWords.filter((_, i) => i !== index))
  }

  // 开始 FILM SCENE - 把单词存入 store 并跳转到 review
  const handleStartFilmScene = () => {
    if (pendingWords.length === 0) return

    // 创建新的词汇条目并添加到 store
    const newVocabulary: Vocabulary[] = pendingWords.map((word, index) => ({
      id: `pending-${Date.now()}-${index}`,
      user_id: 'mock',
      word: word,
      definition: '待 AI 分析...',
      part_of_speech: 'unknown',
      example_sentence: '',
      difficulty_level: 1,
      emotional_intensity: 'vibe',
      tags: [],
      next_review_date: new Date().toISOString(),
      review_count: 0,
      mastery_level: 0,
      easiness_factor: 2.5,
      interval: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }))

    // 合并到现有词汇列表
    setVocabularyList([...newVocabulary, ...vocabularyList])

    // 跳转到 review 页面
    router.push('/review')
  }

  const isReady = pendingWords.length > 0

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态渐变背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #0f172a)',
          backgroundSize: '400% 400%',
          animation: 'gradientBG 15s ease infinite',
        }}
      />

      {/* 光晕效果 */}
      <div
        className="fixed w-[300px] h-[300px] rounded-full opacity-50 -top-[50px] -left-[100px] -z-5 pointer-events-none"
        style={{
          background: '#4f46e5',
          filter: 'blur(70px)',
          animation: 'float 10s infinite ease-in-out',
        }}
      />
      <div
        className="fixed w-[200px] h-[200px] rounded-full opacity-50 bottom-[100px] -right-[50px] -z-5 pointer-events-none"
        style={{
          background: '#ec4899',
          filter: 'blur(70px)',
          animation: 'float 10s infinite ease-in-out',
          animationDelay: '-5s',
        }}
      />

      <div className="container mx-auto px-6 py-8 pb-32 max-w-md">
        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-[32px] font-extrabold leading-tight">
            Pick Your<br />Script
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStreakOverlay(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
            style={{
              background: 'rgba(249, 115, 22, 0.15)',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              color: '#f97316',
              boxShadow: '0 0 15px rgba(249, 115, 22, 0.1)',
            }}
          >
            <Flame className="w-4 h-4 animate-pulse" />
            {currentStreak}
          </motion.button>
        </div>

        {/* Search/Input Capsule */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-full mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Feather className="w-5 h-5 opacity-50" />
          <input
            type="text"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddWord()}
            placeholder="Add word..."
            className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-white/40"
          />
          <Camera className="w-5 h-5 opacity-60 cursor-pointer" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddWord}
            className="text-cyan-400"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* GREEN ROOM */}
        <div className="mb-6">
          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3 pl-1">
            GREEN ROOM
          </div>
          <div className="flex gap-2.5 overflow-x-auto pb-4 min-h-[50px]">
            {pendingWords.length === 0 ? (
              <div className="text-xs opacity-30 pl-1">Empty.</div>
            ) : (
              pendingWords.map((word, index) => (
                <motion.div
                  key={`${word}-${index}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] whitespace-nowrap shrink-0"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span>{word}</span>
                  <X
                    className="w-3.5 h-3.5 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveWord(index)}
                  />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* AVAILABLE SCRIPTS */}
        <div className="mb-6">
          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3">
            AVAILABLE SCRIPTS
          </div>
          <div className="flex gap-4 overflow-x-auto pb-5">
            {genrePosters.map((poster) => (
              <motion.div
                key={poster.id}
                onClick={() => setSelectedGenre(poster.id)}
                className={`relative min-w-[140px] h-[200px] rounded-[20px] overflow-hidden shrink-0 cursor-pointer transition-all duration-300 ${
                  selectedGenre === poster.id
                    ? 'border-2 border-cyan-400 scale-105 z-10'
                    : 'border-2 border-transparent opacity-60 scale-95'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60"
                  style={{ backgroundImage: `url(${poster.image})` }}
                />
                <div className="absolute bottom-4 left-4">
                  <div className="text-[9px] bg-white text-black px-1.5 py-0.5 rounded font-medium mb-1">
                    {poster.tag}
                  </div>
                  <div className="font-serif italic text-lg leading-tight">
                    {poster.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FILM SCENE Button */}
        <motion.button
          whileHover={isReady ? { scale: 1.02 } : {}}
          whileTap={isReady ? { scale: 0.98 } : {}}
          onClick={handleStartFilmScene}
          className={`w-full h-[60px] rounded-[20px] flex flex-col items-center justify-center transition-all duration-300 ${
            isReady
              ? 'bg-cyan-500 border-cyan-500 text-white cursor-pointer'
              : 'text-white/40 cursor-not-allowed'
          }`}
          style={{
            background: isReady ? '#06b6d4' : 'rgba(255, 255, 255, 0.12)',
            border: isReady ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="font-bold text-sm">FILM SCENE</div>
          <div className="text-[10px] opacity-70">
            {isReady ? `${pendingWords.length} word(s) ready` : 'Add words to start'}
          </div>
        </motion.button>
      </div>

      {/* Streak Overlay */}
      <AnimatePresence>
        {showStreakOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8"
            style={{
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.button
              className="absolute top-8 right-8 text-white text-2xl"
              onClick={() => setShowStreakOverlay(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Flame className="w-[50px] h-[50px] mx-auto mb-5 text-orange-500 animate-pulse" />
              <div className="text-[32px] font-extrabold">{currentStreak} Days</div>
              <div className="text-sm opacity-60 mb-5">Current Streak</div>

              <div className="text-[10px] opacity-50 tracking-wider mb-3">
                ACTIVITY (LAST 30 DAYS)
              </div>

              <div className="grid grid-cols-7 gap-2">
                {heatmapData.map((level, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-md"
                    style={{
                      background:
                        level === 3 ? 'rgba(16, 185, 129, 1)' :
                        level === 2 ? 'rgba(16, 185, 129, 0.6)' :
                        level === 1 ? 'rgba(16, 185, 129, 0.3)' :
                        'rgba(255, 255, 255, 0.05)',
                      boxShadow: level === 3 ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 40px); }
        }
      `}</style>
    </div>
  )
}
