'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import type { DramaSeries, DramaEpisode, SeriesType } from '@/lib/types'
import { mockDramaSeries } from '@/lib/mockDramaSeries'
import { createEpisodeFromWords } from '@/lib/dramaGenerator'
import SeriesSelection from '@/components/drama/SeriesSelection'
import EpisodeList from '@/components/drama/EpisodeList'
import DramaPlayer from '@/components/drama/DramaPlayer'
import { motion, AnimatePresence } from 'framer-motion'

type ViewState = 'series-selection' | 'episode-list' | 'player'

export default function ReviewPage() {
  const { vocabularyList, setVocabularyList, storyVocabulary } = useAppStore()

  const [viewState, setViewState] = useState<ViewState>('series-selection')
  const [selectedSeries, setSelectedSeries] = useState<DramaSeries | null>(null)
  const [selectedEpisode, setSelectedEpisode] = useState<DramaEpisode | null>(null)
  const [completedEpisodes, setCompletedEpisodes] = useState<number[]>([])
  const [masteryLevel, setMasteryLevel] = useState<number>(0)

  // Calculate mastery level based on vocabulary mastery
  useEffect(() => {
    if (vocabularyList.length === 0) {
      setMasteryLevel(0)
      return
    }

    const avgMastery = vocabularyList.reduce((sum, vocab) => sum + vocab.mastery_level, 0) / vocabularyList.length
    setMasteryLevel(Math.round(avgMastery))
  }, [vocabularyList])

  const handleSelectSeries = (seriesType: SeriesType) => {
    // Get base series template
    const baseSeries = JSON.parse(JSON.stringify(mockDramaSeries[seriesType])) as DramaSeries

    // Use storyVocabulary (pushed from Green Room) if available, otherwise use all vocabularyList
    const wordsToUse = storyVocabulary.length > 0 ? storyVocabulary : vocabularyList.slice(0, 10)

    if (wordsToUse.length > 0) {
      // Generate dynamic episode from user's words
      const generatedEpisode = createEpisodeFromWords(wordsToUse, 1)

      // Update first episode with generated content
      baseSeries.episodes[0] = {
        ...baseSeries.episodes[0],
        title: generatedEpisode.title,
        hook: generatedEpisode.hook,
        duration: generatedEpisode.duration,
        messages: generatedEpisode.messages,
        vocabIds: generatedEpisode.vocabIds,
        unlocked: true,
      }
    }

    setSelectedSeries(baseSeries)
    setViewState('episode-list')
  }

  const handleSelectEpisode = (episode: DramaEpisode) => {
    setSelectedEpisode(episode)
    setViewState('player')
  }

  const handleBackToEpisodeList = () => {
    setSelectedEpisode(null)
    setViewState('episode-list')
  }

  const handleBackToSeriesSelection = () => {
    setSelectedSeries(null)
    setSelectedEpisode(null)
    setViewState('series-selection')
  }

  const handleEpisodeComplete = () => {
    if (!selectedEpisode) return

    // Mark episode as completed
    if (!completedEpisodes.includes(selectedEpisode.id)) {
      setCompletedEpisodes([...completedEpisodes, selectedEpisode.id])
    }

    // Update vocabulary mastery levels
    const updatedVocabulary = vocabularyList.map((vocab) => {
      if (selectedEpisode.vocabIds.includes(vocab.id)) {
        // Increase mastery by 15-20 points per episode completion
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

    // Show completion animation, then go back to episode list
    setTimeout(() => {
      setSelectedEpisode(null)
      setViewState('episode-list')
    }, 1500)
  }

  // Determine if user has words to review
  const hasWords = storyVocabulary.length > 0 || vocabularyList.length > 0

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {viewState === 'series-selection' && (
          <motion.div
            key="series-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SeriesSelection onSelectSeries={handleSelectSeries} />
          </motion.div>
        )}

        {viewState === 'episode-list' && selectedSeries && (
          <motion.div
            key="episode-list"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <EpisodeList
              series={selectedSeries}
              onBack={handleBackToSeriesSelection}
              onSelectEpisode={handleSelectEpisode}
              completedEpisodes={completedEpisodes}
              masteryLevel={masteryLevel}
            />
          </motion.div>
        )}

        {viewState === 'player' && selectedSeries && selectedEpisode && (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <DramaPlayer
              series={selectedSeries}
              episode={selectedEpisode}
              onBack={handleBackToEpisodeList}
              onComplete={handleEpisodeComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* No words warning */}
      {!hasWords && viewState === 'series-selection' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900/90 backdrop-blur-md border border-yellow-500/50 rounded-xl px-6 py-3 shadow-2xl"
          >
            <p className="text-sm text-yellow-200">
              💡 Add words first, then push them to Story from Green Room
            </p>
          </motion.div>
        </div>
      )}
    </div>
  )
}
