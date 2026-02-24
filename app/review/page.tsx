'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import type { DramaSeries, DramaEpisode, SeriesType } from '@/lib/types'
import { mockDramaSeries } from '@/lib/mockDramaSeries'
import SeriesSelection from '@/components/drama/SeriesSelection'
import EpisodeList from '@/components/drama/EpisodeList'
import DramaPlayer from '@/components/drama/DramaPlayer'
import { motion, AnimatePresence } from 'framer-motion'

type ViewState = 'series-selection' | 'episode-list' | 'player' | 'generating'

export default function ReviewPage() {
  const { vocabularyList, setVocabularyList, storyVocabulary, interfaceLanguage, userSettings } = useAppStore()

  const [viewState, setViewState] = useState<ViewState>('series-selection')
  const [selectedSeries, setSelectedSeries] = useState<DramaSeries | null>(null)
  const [selectedEpisode, setSelectedEpisode] = useState<DramaEpisode | null>(null)
  const [completedEpisodes, setCompletedEpisodes] = useState<number[]>([])
  const [masteryLevel, setMasteryLevel] = useState<number>(0)
  const [generationError, setGenerationError] = useState<string | null>(null)

  // Calculate mastery level based on vocabulary mastery
  useEffect(() => {
    if (vocabularyList.length === 0) {
      setMasteryLevel(0)
      return
    }

    const avgMastery = vocabularyList.reduce((sum, vocab) => sum + vocab.mastery_level, 0) / vocabularyList.length
    setMasteryLevel(Math.round(avgMastery))
  }, [vocabularyList])

  const handleSelectSeries = async (seriesType: SeriesType) => {
    const baseSeries = JSON.parse(JSON.stringify(mockDramaSeries[seriesType])) as DramaSeries
    const wordsToUse = storyVocabulary.length > 0 ? storyVocabulary : vocabularyList.slice(0, 10)

    if (wordsToUse.length === 0) {
      setSelectedSeries(baseSeries)
      setViewState('episode-list')
      return
    }

    // Show generating state
    setViewState('generating')
    setGenerationError(null)

    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: wordsToUse.map(w => ({ word: w.word, definition: w.definition })),
          genre: baseSeries.title,
          language: interfaceLanguage,
          userLevel: userSettings?.english_level || 'B1',
          definitionPreference: userSettings?.definition_preference || 'simple_english',
          perspective: userSettings?.gender || 'neutral',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate story')
      }

      const data = await response.json()

      // Update first episode with AI-generated content
      baseSeries.episodes[0] = {
        ...baseSeries.episodes[0],
        title: data.title || baseSeries.episodes[0].title,
        hook: data.hook || baseSeries.episodes[0].hook,
        duration: `${Math.max(3, Math.ceil(data.messages.length / 5))} min`,
        messages: data.messages,
        vocabIds: wordsToUse.map(w => w.id),
        unlocked: true,
      }

      setSelectedSeries(baseSeries)
      setViewState('episode-list')
    } catch (error) {
      console.error('Story generation failed:', error)
      setGenerationError('Story generation failed. Please try again.')
      setViewState('series-selection')
    }
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
        {viewState === 'generating' && (
          <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="mb-6"
            >
              <div className="w-16 h-16 rounded-full border-4 border-electric-purple/30 border-t-electric-purple" />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center"
            >
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">Writing Your Story...</h2>
              <p className="text-sm text-muted-foreground">AI is crafting a drama with your vocabulary words</p>
            </motion.div>
          </motion.div>
        )}

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

      {/* Generation error toast */}
      <AnimatePresence>
        {generationError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-red-900/90 backdrop-blur-md border border-red-500/50 rounded-xl px-6 py-3 shadow-2xl">
              <p className="text-sm text-red-200">{generationError}</p>
              <button
                onClick={() => setGenerationError(null)}
                className="text-xs text-red-300 underline mt-1"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
