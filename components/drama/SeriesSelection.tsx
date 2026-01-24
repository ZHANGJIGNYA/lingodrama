'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { DramaSeries, SeriesType } from '@/lib/types'
import { mockDramaSeries } from '@/lib/mockDramaSeries'

interface SeriesSelectionProps {
  onSelectSeries: (seriesType: SeriesType) => void
}

const seriesData: Array<{
  type: SeriesType
  title: string
  subtitle: string
  hook: string
  emoji: string
  gradient: string
  targetAudience: string
  theme: string
}> = [
  {
    type: 'female',
    title: 'Romance Drama',
    subtitle: 'The Perfect Marriage',
    hook: 'I saw my husband with HER at the hotel... holding our wedding ring',
    emoji: '💔',
    gradient: 'from-rose-900 via-pink-900 to-red-900',
    targetAudience: 'Female-oriented',
    theme: 'Love, betrayal, and revenge'
  },
  {
    type: 'male',
    title: 'Corporate Thriller',
    subtitle: 'The Corporate Game',
    hook: 'My boss just offered me a deal I can\'t refuse... or can I?',
    emoji: '💼',
    gradient: 'from-blue-900 via-indigo-900 to-purple-900',
    targetAudience: 'Male-oriented',
    theme: 'Power, ambition, and conspiracy'
  },
  {
    type: 'neutral',
    title: 'Mystery',
    subtitle: 'The Missing File',
    hook: 'They found the body in the office. Everyone\'s a suspect.',
    emoji: '🔍',
    gradient: 'from-gray-900 via-slate-800 to-zinc-900',
    targetAudience: 'Neutral',
    theme: 'Crime, investigation, and secrets'
  }
]

export default function SeriesSelection({ onSelectSeries }: SeriesSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black relative overflow-hidden">
      {/* Film grain effect */}
      <div className="film-grain absolute inset-0 pointer-events-none opacity-30" />

      {/* Vignette effect */}
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-4">🎬</div>
          <h1 className="text-5xl font-bold text-white mb-3">
            Choose Your Story
          </h1>
          <p className="text-xl text-gray-300">
            Learn vocabulary through addictive drama
          </p>
        </motion.div>

        {/* Series Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <div className={`relative bg-gradient-to-br ${series.gradient} rounded-2xl p-8 border-2 border-white/20 hover:border-white/40 transition-all overflow-hidden h-full`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

                  <div className="relative z-10">
                    {/* Emoji */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {series.emoji}
                    </div>

                    {/* Genre Badge */}
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 mb-3">
                      {series.targetAudience}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {series.title}
                    </h2>

                    {/* Subtitle */}
                    <h3 className="text-lg text-gray-200 mb-4 font-semibold">
                      {series.subtitle}
                    </h3>

                    {/* Hook */}
                    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 mb-4">
                      <p className="text-sm text-gray-200 italic leading-relaxed">
                        "{series.hook}"
                      </p>
                    </div>

                    {/* Theme */}
                    <p className="text-sm text-gray-300 mb-4">
                      {series.theme}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                      <span className="text-sm font-semibold text-white">
                        Start Series
                      </span>
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
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
          className="text-center"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-3">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <div className="text-3xl mb-2">📖</div>
                <div className="font-semibold text-white mb-1">Read the Drama</div>
                <div>Follow the story through chat-style messages</div>
              </div>
              <div>
                <div className="text-3xl mb-2">💡</div>
                <div className="font-semibold text-white mb-1">Learn Words</div>
                <div>Tap highlighted words to see meanings</div>
              </div>
              <div>
                <div className="text-3xl mb-2">🔓</div>
                <div className="font-semibold text-white mb-1">Unlock Episodes</div>
                <div>Master words to continue the story</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-gray-500">
            Choose any series - they all teach vocabulary effectively
          </p>
        </motion.div>
      </div>
    </div>
  )
}
