'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ArrowLeft, List, Zap, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { DramaEpisode, DramaSeries, WordState, Vocabulary } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import MessageBubble from './MessageBubble'
import TranslationCard from './TranslationCard'

interface DramaPlayerProps {
  series: DramaSeries
  episode: DramaEpisode
  onBack: () => void
  onComplete: () => void
}

export default function DramaPlayer({ series, episode, onBack, onComplete }: DramaPlayerProps) {
  const { vocabularyList, storyVocabulary } = useAppStore()
  const router = useRouter()

  // Combine vocabularyList and storyVocabulary for lookup
  const allVocabulary = [...storyVocabulary, ...vocabularyList]

  const [currentMsgIndex, setCurrentMsgIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [wordStates, setWordStates] = useState<Record<string, WordState>>({})
  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null)
  const [showVocabPanel, setShowVocabPanel] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll to bottom when new message appears, but keep button visible
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [currentMsgIndex])

  // Initialize word states
  useEffect(() => {
    const states: Record<string, WordState> = {}
    episode.messages.forEach((msg) => {
      msg.vocabs.forEach((vocab, index) => {
        const key = `${msg.id}-${index}`
        const actualVocab = allVocabulary.find(v =>
          v.word.toLowerCase() === vocab.word.toLowerCase()
        )
        states[key] = {
          word: vocab.word,
          type: vocab.type,
          revealed: false,
          vocabularyId: actualVocab?.id || ''
        }
      })
    })
    setWordStates(states)
  }, [episode, allVocabulary])

  const handleContinue = () => {
    if (currentMsgIndex >= episode.messages.length - 1) {
      // Show completion modal instead of immediately completing
      setShowCompletionModal(true)
      return
    }

    setIsTyping(true)
    setTimeout(() => {
      setCurrentMsgIndex(prev => prev + 1)
      setIsTyping(false)
    }, 800)
  }

  const handleGoToQuiz = () => {
    onComplete()
    router.push('/quiz')
  }

  const handleFinishWithoutQuiz = () => {
    onComplete()
  }

  const handleWordClick = (word: string, vocab: Vocabulary) => {
    setSelectedVocab(vocab)

    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current)
    }
    autoCloseTimerRef.current = setTimeout(() => {
      setSelectedVocab(null)
    }, 3000)
  }

  const handleWordReveal = (messageId: string, vocabIndex: number) => {
    const key = `${messageId}-${vocabIndex}`
    setWordStates(prev => ({
      ...prev,
      [key]: { ...prev[key], revealed: true }
    }))
  }

  const closeTranslation = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current)
    }
    setSelectedVocab(null)
  }

  const progress = ((currentMsgIndex + 1) / episode.messages.length) * 100
  const visibleMessages = episode.messages.slice(0, currentMsgIndex + 1)
  const isComplete = currentMsgIndex >= episode.messages.length - 1

  // Get all unique vocabs in this episode
  const episodeVocabs = Array.from(
    new Set(episode.messages.flatMap(msg => msg.vocabs.map(v => v.word)))
  ).map(word => allVocabulary.find(v => v.word.toLowerCase() === word.toLowerCase()))
    .filter(Boolean) as Vocabulary[]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between mb-2 max-w-md mx-auto">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="flex-1 text-center">
            <div className="text-xs text-muted-foreground">Ep{episode.id}: {episode.title}</div>
          </div>

          <button
            onClick={() => setShowVocabPanel(!showVocabPanel)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <List className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-electric-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Vocab Panel Sidebar */}
      <AnimatePresence>
        {showVocabPanel && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 bottom-0 w-72 bg-card/95 backdrop-blur-lg border-l border-border z-20 p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base font-bold text-foreground">Episode Words</h3>
              <button
                onClick={() => setShowVocabPanel(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {episodeVocabs.map((vocab) => (
                <div
                  key={vocab.id}
                  onClick={() => handleWordClick(vocab.word, vocab)}
                  className="p-3 bg-secondary/50 hover:bg-secondary rounded-lg cursor-pointer transition-colors border border-border"
                >
                  <div className="text-sm font-semibold text-foreground">{vocab.word}</div>
                  <div className="text-xs text-muted-foreground">{vocab.definition}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6">
          {visibleMessages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isUser={message.sender === 'You'}
              wordStates={wordStates}
              vocabularyList={allVocabulary}
              onWordClick={handleWordClick}
              onWordReveal={handleWordReveal}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-lg">
                {episode.messages[currentMsgIndex + 1]?.avatar}
              </div>
              <div className="bg-card border border-border px-5 py-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background to-transparent p-4 z-10">
        <div className="max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={isTyping}
            className={`w-full py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg transition-all ${
              isComplete
                ? 'bg-luxury-gold text-black shadow-luxury-gold/30'
                : 'bg-danger-red text-white shadow-danger-red/30'
            } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isTyping ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : isComplete ? (
              <>Complete Episode</>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Translation Card */}
      <TranslationCard vocab={selectedVocab} onClose={closeTranslation} />

      {/* Episode Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl text-center">
                {/* Success animation */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-5xl mb-4"
                >
                  🎬
                </motion.div>

                <h2 className="font-serif text-xl font-bold text-foreground mb-2">
                  Episode Complete!
                </h2>
                <p className="text-sm text-muted-foreground mb-2">
                  You reviewed {episodeVocabs.length} words in this episode
                </p>

                {/* Words summary */}
                <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                  {episodeVocabs.map((v) => (
                    <span
                      key={v.id}
                      className="px-2 py-1 text-xs bg-electric-purple/10 text-electric-purple rounded-full"
                    >
                      {v.word}
                    </span>
                  ))}
                </div>

                {/* Quiz option */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoToQuiz}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-luxury-gold text-black font-bold rounded-xl shadow-lg shadow-luxury-gold/30 mb-3"
                >
                  <Zap className="w-5 h-5" />
                  Quiz Now (Recommended)
                </motion.button>

                <button
                  onClick={handleFinishWithoutQuiz}
                  className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Skip Quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
