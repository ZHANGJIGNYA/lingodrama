'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Lock, CheckCircle, Clock, Play } from 'lucide-react'
import type { DramaSeries, DramaEpisode } from '@/lib/types'

interface EpisodeListProps {
  series: DramaSeries
  onBack: () => void
  onSelectEpisode: (episode: DramaEpisode) => void
  completedEpisodes?: number[]
  masteryLevel?: number
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10 max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="mb-4 p-2 hover:bg-secondary rounded-lg transition-colors inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{series.emoji}</div>
            <h1 className="font-serif text-2xl font-bold text-foreground mb-1">{series.title}</h1>
            <p className="text-sm text-muted-foreground">{series.subtitle}</p>
          </div>

          {/* Mastery Progress */}
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Your Mastery</span>
              <span className="text-sm font-bold text-foreground">{masteryLevel}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-electric-purple to-danger-red"
                initial={{ width: 0 }}
                animate={{ width: `${masteryLevel}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="space-y-3">
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
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isLocked
                      ? 'bg-secondary/30 border-border cursor-not-allowed opacity-50'
                      : isCompleted
                      ? 'bg-card border-luxury-gold/50 hover:border-luxury-gold'
                      : 'bg-card border-border hover:border-electric-purple/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Episode Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      isLocked
                        ? 'bg-secondary text-muted-foreground'
                        : isCompleted
                        ? 'bg-luxury-gold/20 text-luxury-gold'
                        : 'bg-electric-purple/20 text-electric-purple'
                    }`}>
                      {isLocked ? (
                        <Lock className="w-5 h-5" />
                      ) : isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-electric-purple">
                          Episode {episode.id}
                        </span>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {episode.duration}
                        </span>
                      </div>

                      <h3 className="font-serif text-base font-bold text-foreground mb-1 truncate">
                        {episode.title}
                      </h3>

                      <p className={`text-xs leading-relaxed line-clamp-2 ${
                        isLocked ? 'text-muted-foreground/50' : 'text-muted-foreground'
                      }`}>
                        {episode.hook}
                      </p>

                      {/* Unlock Requirements */}
                      {isLocked && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-danger-red">
                          <Lock className="w-3 h-3" />
                          <span>
                            Unlock at {episode.masteryRequired}% mastery
                          </span>
                        </div>
                      )}

                      {/* Completion Badge */}
                      {isCompleted && (
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-luxury-gold/10 border border-luxury-gold/30 rounded-full text-[10px] text-luxury-gold">
                          <CheckCircle className="w-2.5 h-2.5" />
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
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Complete episodes to unlock the next chapter</p>
        </div>
      </div>
    </div>
  )
}
