'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle, Clock, Play } from 'lucide-react'
import type { DramaSeries, DramaEpisode } from '@/lib/types'

interface EpisodeListProps {
  series: DramaSeries
  onBack: () => void
  onSelectEpisode: (episode: DramaEpisode) => void
  completedEpisodes?: number[] // IDs of completed episodes
  masteryLevel?: number // Current mastery level (0-100)
}

export default function EpisodeList({
  series,
  onBack,
  onSelectEpisode,
  completedEpisodes = [],
  masteryLevel = 0
}: EpisodeListProps) {
  const getEpisodeStatus = (episode: DramaEpisode) => {
    if (completedEpisodes.includes(episode.id)) {
      return 'completed'
    }
    if (episode.unlocked || masteryLevel >= episode.masteryRequired) {
      return 'unlocked'
    }
    return 'locked'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${series.gradient} relative overflow-hidden`}>
      {/* Film grain effect */}
      <div className="film-grain absolute inset-0 pointer-events-none opacity-30" />

      {/* Vignette effect */}
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-6 p-2 hover:bg-white/10 rounded-lg transition-colors inline-flex items-center gap-2 text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Series</span>
          </button>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{series.emoji}</div>
            <h1 className="text-4xl font-bold text-white mb-2">{series.title}</h1>
            <p className="text-gray-300 text-lg">{series.subtitle}</p>
          </div>

          {/* Mastery Progress */}
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Your Mastery</span>
              <span className="text-sm font-bold text-white">{masteryLevel}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${masteryLevel}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="space-y-4">
          {series.episodes.map((episode, index) => {
            const status = getEpisodeStatus(episode)
            const isLocked = status === 'locked'
            const isCompleted = status === 'completed'

            return (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => !isLocked && onSelectEpisode(episode)}
                  disabled={isLocked}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    isLocked
                      ? 'bg-gray-900/50 border-gray-700 cursor-not-allowed opacity-60'
                      : isCompleted
                      ? 'bg-green-900/30 border-green-500 hover:bg-green-900/40'
                      : 'bg-black/40 border-white/20 hover:bg-black/60 hover:border-white/40'
                  } backdrop-blur-md`}
                >
                  <div className="flex items-start gap-4">
                    {/* Episode Number */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${
                      isLocked
                        ? 'bg-gray-800 text-gray-500'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-purple-600 text-white'
                    }`}>
                      {isLocked ? (
                        <Lock className="w-8 h-8" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-purple-300">
                          Episode {episode.id}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {episode.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {episode.title}
                      </h3>

                      <p className={`text-sm leading-relaxed ${
                        isLocked ? 'text-gray-500' : 'text-gray-300'
                      }`}>
                        {episode.hook}
                      </p>

                      {/* Unlock Requirements */}
                      {isLocked && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-yellow-400">
                          <Lock className="w-3 h-3" />
                          <span>
                            Unlock at {episode.masteryRequired}% mastery (Current: {masteryLevel}%)
                          </span>
                        </div>
                      )}

                      {/* Cliffhanger from previous episode */}
                      {!isLocked && episode.cliffhanger && index > 0 && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-xs text-purple-300 mb-1">Previously on:</div>
                          <div className="text-sm text-white italic">"{episode.cliffhanger}"</div>
                        </div>
                      )}

                      {/* Completion Badge */}
                      {isCompleted && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-600/20 border border-green-500/50 rounded-full text-xs text-green-300">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Hint */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Complete episodes to unlock the next chapter of the story</p>
        </div>
      </div>
    </div>
  )
}
