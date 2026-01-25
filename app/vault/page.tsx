'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import type { Vocabulary } from '@/lib/types'

// Mock 数据
const mockArchives: Array<{ text: string; level: string; source: string }> = [
  { text: 'Apple', level: 'A1', source: 'Daily Life' },
  { text: 'Run', level: 'A1', source: "The CEO's Lie" },
  { text: 'Travel', level: 'A2', source: 'Neon Rain' },
  { text: 'Promise', level: 'A2', source: "The CEO's Lie" },
  { text: 'Strategy', level: 'B1', source: "Dragon's Pact" },
  { text: 'Betrayal', level: 'B1', source: "The CEO's Lie" },
  { text: 'Contract', level: 'B2', source: "The CEO's Lie" },
  { text: 'Negotiate', level: 'B2', source: 'Neon Rain' },
  { text: 'Vulnerable', level: 'C1', source: "Dragon's Pact" },
  { text: 'Hypothesis', level: 'C1', source: 'Neon Rain' },
  { text: 'Serendipity', level: 'C2', source: 'Daily Life' },
  { text: 'Ephemeral', level: 'C2', source: "The CEO's Lie" },
]

// 环形图组件
function RingChart({
  data,
  colors,
  label,
}: {
  data: Record<string, number>
  colors: string[]
  label: string
}) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1
  let start = 0
  const gradientParts: string[] = []
  const legends: Array<{ key: string; val: number; color: string }> = []

  Object.entries(data).forEach(([key, val], i) => {
    if (val > 0) {
      const pct = (val / total) * 100
      const color = colors[i % colors.length]
      gradientParts.push(`${color} ${start}% ${start + pct}%`)
      legends.push({ key, val, color })
      start += pct
    }
  })

  if (gradientParts.length === 0) {
    gradientParts.push('#333 0% 100%')
  }

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Ring */}
      <div
        className="w-[120px] h-[120px] rounded-full relative flex items-center justify-center shrink-0"
        style={{
          background: `conic-gradient(${gradientParts.join(', ')})`,
          boxShadow: '0 0 30px rgba(0,0,0,0.2)',
        }}
      >
        <div
          className="w-[100px] h-[100px] rounded-full flex flex-col items-center justify-center"
          style={{
            background: '#151c2f',
            boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
          }}
        >
          <div className="text-2xl font-bold text-white leading-none">{total}</div>
          <div className="text-[9px] text-white/50 mt-1">{label}</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 flex-1">
        {legends.map(({ key, val, color }) => (
          <div
            key={key}
            className="flex items-center justify-between text-[11px] pb-1 border-b border-white/5 last:border-b-0"
          >
            <div className="flex items-center gap-2 text-white/70">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color }}
              />
              <span>{key}</span>
            </div>
            <div className="font-bold text-white">{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VocabularyPage() {
  const { vocabularyList } = useAppStore()
  const [archives, setArchives] = useState(mockArchives)

  // 合并 store 中的词汇到 archives
  useEffect(() => {
    if (vocabularyList.length > 0) {
      const storeWords = vocabularyList.map((v) => ({
        text: v.word,
        level: getLevelFromDifficulty(v.difficulty_level),
        source: 'Added',
      }))
      setArchives([...storeWords, ...mockArchives])
    }
  }, [vocabularyList])

  // 计算 CEFR 分布
  const levelDistribution: Record<string, number> = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0,
    C2: 0,
  }
  archives.forEach((w) => {
    if (levelDistribution[w.level] !== undefined) {
      levelDistribution[w.level]++
    }
  })

  // 计算来源分布
  const sourceDistribution: Record<string, number> = {}
  archives.forEach((w) => {
    sourceDistribution[w.source] = (sourceDistribution[w.source] || 0) + 1
  })
  const topSources = Object.fromEntries(
    Object.entries(sourceDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  )

  const getLevelColor = (level: string) => {
    if (level.startsWith('C')) return '#f43f5e'
    if (level.startsWith('B')) return '#facc15'
    return '#4ade80'
  }

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
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] font-extrabold leading-tight mb-6"
        >
          Vocabulary
        </motion.h1>

        {/* CEFR Distribution Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex justify-between items-center text-xs font-bold text-white/80 mb-5 tracking-wide">
            <span>CEFR DISTRIBUTION</span>
            <MoreHorizontal className="w-4 h-4 opacity-60" />
          </div>
          <RingChart
            data={levelDistribution}
            colors={['#4ade80', '#22c55e', '#facc15', '#f97316', '#f87171', '#be123c']}
            label="Words"
          />
        </motion.div>

        {/* Source Breakdown Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-5 mb-6"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex justify-between items-center text-xs font-bold text-white/80 mb-5 tracking-wide">
            <span>SOURCE BREAKDOWN</span>
            <MoreHorizontal className="w-4 h-4 opacity-60" />
          </div>
          <RingChart
            data={topSources}
            colors={['#3b82f6', '#06b6d4', '#8b5cf6']}
            label="Scripts"
          />
        </motion.div>

        {/* Library List */}
        <div className="text-xs font-bold text-white/60 mb-3 tracking-wider">
          LIBRARY
        </div>
        <div className="space-y-2">
          {archives.map((word, index) => (
            <motion.div
              key={`${word.text}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * Math.min(index, 10) }}
              className="flex justify-between items-center p-3.5 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid transparent',
              }}
            >
              <span className="text-white">{word.text}</span>
              <span
                className="text-[10px] px-2 py-0.5 rounded border border-white/20 opacity-70"
                style={{ color: getLevelColor(word.level) }}
              >
                {word.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

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

// 根据难度等级返回 CEFR 级别
function getLevelFromDifficulty(difficulty: number): string {
  if (difficulty <= 1) return 'A1'
  if (difficulty <= 2) return 'A2'
  if (difficulty <= 3) return 'B1'
  if (difficulty <= 4) return 'B2'
  if (difficulty <= 5) return 'C1'
  return 'C2'
}
