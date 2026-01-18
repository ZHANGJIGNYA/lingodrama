'use client'

import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, Flame } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// Mock 数据 - 后续接入 Supabase
const mockStats = {
  totalVocabulary: 127,
  wordsDueToday: 5,
  wordsMastered: 89,
  currentStreak: 12,
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  status?: 'safe' | 'warning' | 'danger'
  description?: string
  href?: string
}

function StatCard({ title, value, icon, status = 'safe', description, href }: StatCardProps) {
  const borderColor = {
    safe: 'border-success',
    warning: 'border-warning',
    danger: 'border-destructive',
  }[status]

  const glowColor = {
    safe: 'shadow-success/20',
    warning: 'shadow-warning/20',
    danger: 'shadow-destructive/20',
  }[status]

  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-card rounded-lg p-6 border-2 transition-all',
        borderColor,
        status !== 'safe' && 'shadow-lg',
        status !== 'safe' && glowColor
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground">{icon}</div>
        {status === 'danger' && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-3 h-3 bg-destructive rounded-full"
          />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-4xl font-bold text-foreground">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        )}
      </div>
    </motion.div>
  )

  if (href) {
    return <Link href={href}>{card}</Link>
  }

  return card
}

export default function Dashboard() {
  const hasDueWords = mockStats.wordsDueToday > 0

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-sm">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          🎬 <span className="bg-gradient-to-r from-primary to-warning bg-clip-text text-transparent">
            导演看板
          </span>
        </h1>
        <p className="text-muted-foreground">
          全局数据概览 · {new Date().toLocaleDateString('zh-CN', {
            month: 'long',
            day: 'numeric',
            weekday: 'short'
          })}
        </p>
      </motion.header>

      <div className="space-y-4 mb-8">
        {/* 今日复习提醒卡片 - 最重要 */}
        <StatCard
          title="今日需复习"
          value={mockStats.wordsDueToday}
          icon={<Clock className="w-6 h-6" />}
          status={hasDueWords ? 'danger' : 'safe'}
          description={hasDueWords ? '点击开始复习' : '太棒了！今天没有待复习单词'}
          href="/review"
        />

        {/* 其他统计卡片 */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="总词汇量"
            value={mockStats.totalVocabulary}
            icon={<BookOpen className="w-5 h-5" />}
            status="safe"
            href="/vault"
          />

          <StatCard
            title="已掌握"
            value={mockStats.wordsMastered}
            icon={<Trophy className="w-5 h-5" />}
            status="safe"
          />
        </div>

        <StatCard
          title="连续学习天数"
          value={mockStats.currentStreak}
          icon={<Flame className="w-6 h-6" />}
          status={mockStats.currentStreak >= 7 ? 'warning' : 'safe'}
          description={`坚持了 ${mockStats.currentStreak} 天，继续保持！`}
        />
      </div>

      {/* 快捷操作 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-medium text-muted-foreground mb-3">快捷操作</h2>

        <Link href="/vault">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-primary-foreground rounded-lg py-4 px-6 font-medium hover:opacity-90 transition-opacity"
          >
            📥 添加新单词
          </motion.button>
        </Link>

        {hasDueWords && (
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-destructive text-destructive-foreground rounded-lg py-4 px-6 font-medium hover:opacity-90 transition-opacity"
            >
              ⚡ 开始今日挑战
            </motion.button>
          </Link>
        )}
      </motion.div>
    </div>
  )
}
