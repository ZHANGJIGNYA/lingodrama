'use client'

import { motion } from 'framer-motion'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { SeriesType } from '@/lib/types'

interface SeriesSelectionProps {
  onSelectSeries: (seriesType: SeriesType) => void
}

const seriesData: Array<{
  type: SeriesType
  title: string
  subtitle: string
  hook: string
  emoji: string
  accentColor: string
  targetAudience: string
  theme: string
}> = [
  {
    type: 'female',
    title: 'Romance Drama',
    subtitle: 'The Perfect Marriage',
    hook: 'I saw my husband with HER at the hotel... holding our wedding ring',
    emoji: '💔',
    accentColor: 'danger-red',
    targetAudience: 'Female-oriented',
    theme: 'Love, betrayal, and revenge'
  },
  {
    type: 'male',
    title: 'Corporate Thriller',
    subtitle: 'The Corporate Game',
    hook: 'My boss just offered me a deal I can\'t refuse... or can I?',
    emoji: '💼',
    accentColor: 'electric-purple',
    targetAudience: 'Male-oriented',
    theme: 'Power, ambition, and conspiracy'
  },
  {
    type: 'neutral',
    title: 'Mystery',
    subtitle: 'The Missing File',
    hook: 'They found the body in the office. Everyone\'s a suspect.',
    emoji: '🔍',
    accentColor: 'luxury-gold',
    targetAudience: 'Neutral',
    theme: 'Crime, investigation, and secrets'
  }
]

export default function SeriesSelection({ onSelectSeries }: SeriesSelectionProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="mb-4 p-2 hover:bg-secondary rounded-lg transition-colors inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="text-5xl mb-4">🎬</div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Choose Your Story
          </h1>
          <p className="text-sm text-muted-foreground">
            Learn vocabulary through addictive drama
          </p>
        </motion.div>

        {/* Series Cards */}
        <div className="space-y-4 mb-8">
          {seriesData.map((series, index) => (
            <motion.div
              key={series.type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <button
                onClick={() => onSelectSeries(series.type)}
                className="w-full group"
              >
                <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-electric-purple/50 transition-all overflow-hidden">
                  {/* Accent line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-${series.accentColor}`}
                    style={{
                      backgroundColor: series.accentColor === 'danger-red' ? '#E50914' :
                                       series.accentColor === 'electric-purple' ? '#9D00FF' : '#FFD700'
                    }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Emoji */}
                      <div className="text-4xl group-hover:scale-110 transition-transform">
                        {series.emoji}
                      </div>

                      <div className="flex-1 text-left">
                        {/* Genre Badge */}
                        <div className="inline-block px-2 py-0.5 bg-secondary rounded-full text-[10px] text-muted-foreground mb-2">
                          {series.targetAudience}
                        </div>

                        {/* Title */}
                        <h2 className="font-serif text-xl font-bold text-foreground mb-1">
                          {series.title}
                        </h2>

                        {/* Subtitle */}
                        <h3 className="text-sm text-muted-foreground mb-3">
                          {series.subtitle}
                        </h3>

                        {/* Hook */}
                        <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                          <p className="text-xs text-foreground/80 italic leading-relaxed">
                            "{series.hook}"
                          </p>
                        </div>

                        {/* Theme */}
                        <p className="text-xs text-muted-foreground">
                          {series.theme}
                        </p>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-electric-purple group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-card rounded-xl p-4 border border-border">
            <h3 className="text-sm font-bold text-foreground mb-3 text-center">
              How It Works
            </h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl mb-1">📖</div>
                <div className="text-[10px] font-semibold text-foreground mb-0.5">Read</div>
                <div className="text-[10px] text-muted-foreground">Chat-style story</div>
              </div>
              <div>
                <div className="text-2xl mb-1">💡</div>
                <div className="text-[10px] font-semibold text-foreground mb-0.5">Learn</div>
                <div className="text-[10px] text-muted-foreground">Tap for meanings</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🔓</div>
                <div className="text-[10px] font-semibold text-foreground mb-0.5">Unlock</div>
                <div className="text-[10px] text-muted-foreground">Continue story</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
