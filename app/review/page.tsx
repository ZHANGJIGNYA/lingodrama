'use client'

import { useState } from 'react'
import { useAppStore } from '@/lib/store'
import type { DramaEpisode } from '@/lib/types'
import { fixedDramas } from '@/lib/fixed-dramas'
import DramaPlayer from '@/components/drama/DramaPlayer'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'

type ViewState = 'drama-selection' | 'player'

export default function ReviewPage() {
  const { vocabularyList, setVocabularyList } = useAppStore()

  const [viewState, setViewState] = useState<ViewState>('drama-selection')
  const [selectedDrama, setSelectedDrama] = useState<DramaEpisode | null>(null)
  const [completedDramas, setCompletedDramas] = useState<number[]>([])

  const handleSelectDrama = (drama: DramaEpisode) => {
    setSelectedDrama(drama)
    setViewState('player')
  }

  const handleBackToDramaSelection = () => {
    setSelectedDrama(null)
    setViewState('drama-selection')
  }

  const handleDramaComplete = () => {
    if (!selectedDrama) return

    // Mark drama as completed
    if (!completedDramas.includes(selectedDrama.id)) {
      setCompletedDramas([...completedDramas, selectedDrama.id])
    }

    // Update vocabulary mastery levels for words in this drama
    const dramaWords = selectedDrama.messages.flatMap(msg => msg.vocabs.map(v => v.word.toLowerCase()))
    const updatedVocabulary = vocabularyList.map((vocab) => {
      if (dramaWords.includes(vocab.word.toLowerCase())) {
        const increase = Math.floor(Math.random() * 6) + 15
        const newMastery = Math.min(100, vocab.mastery_level + increase)

        return {
          ...vocab,
          mastery_level: newMastery,
          review_count: vocab.review_count + 1,
          updated_at: new Date().toISOString()
        }
      }
      return vocab
    })

    setVocabularyList(updatedVocabulary)

    // Go back to drama selection
    setTimeout(() => {
      setSelectedDrama(null)
      setViewState('drama-selection')
    }, 1500)
  }

  // Mock series data for DramaPlayer compatibility
  const mockSeries = {
    id: 'fixed-dramas',
    title: 'LingoDrama Stories',
    description: 'Learn English through addictive short dramas',
    genre: 'drama' as const,
    coverImage: '/images/drama-cover.jpg',
    totalEpisodes: fixedDramas.length,
    episodes: fixedDramas
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {viewState === 'drama-selection' && (
          <motion.div
            key="drama-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 px-4 py-4 bg-background/95 backdrop-blur-sm border-b border-border">
              <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-2xl font-bold text-foreground">Choose Your Drama</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Select a story to start learning
                </p>
              </div>
            </div>

            {/* Drama Cards */}
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
              {fixedDramas.map((drama, index) => {
                const isCompleted = completedDramas.includes(drama.id)
                const wordCount = new Set(drama.messages.flatMap(msg => msg.vocabs.map(v => v.word))).size

                return (
                  <motion.div
                    key={drama.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelectDrama(drama)}
                    className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-electric-purple transition-all hover:shadow-lg hover:shadow-electric-purple/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-serif text-lg font-bold text-foreground">
                            {drama.title}
                          </h3>
                          {isCompleted && (
                            <span className="text-xs bg-luxury-gold/20 text-luxury-gold px-2 py-0.5 rounded-full">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {drama.hook}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{drama.messages.length} messages</span>
                          <span>•</span>
                          <span>{wordCount} words</span>
                          <span>•</span>
                          <span className="capitalize">{drama.genre.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <button className="flex-shrink-0 w-12 h-12 rounded-full bg-electric-purple/10 hover:bg-electric-purple/20 flex items-center justify-center transition-colors">
                        <Play className="w-5 h-5 text-electric-purple" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {viewState === 'player' && selectedDrama && (
          <motion.div
            key="player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DramaPlayer
              series={mockSeries}
              episode={selectedDrama}
              onBack={handleBackToDramaSelection}
              onComplete={handleDramaComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
