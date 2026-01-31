'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ArrowLeft, List } from 'lucide-react'
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
  const { vocabularyList } = useAppStore()

  const [currentMsgIndex, setCurrentMsgIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [wordStates, setWordStates] = useState<Record<string, WordState>>({})
  const [selectedVocab, setSelectedVocab] = useState<Vocabulary | null>(null)
  const [showVocabPanel, setShowVocabPanel] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll to bottom when new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentMsgIndex])

  // Initialize word states
  useEffect(() => {
    const states: Record<string, WordState> = {}
    episode.messages.forEach((msg) => {
      msg.vocabs.forEach((vocab, index) => {
        const key = `${msg.id}-${index}`
        const actualVocab = vocabularyList.find(v =>
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
  }, [episode, vocabularyList])

  const handleContinue = () => {
    if (currentMsgIndex >= episode.messages.length - 1) {
      onComplete()
      return
    }

    setIsTyping(true)
    setTimeout(() => {
      setCurrentMsgIndex(prev => prev + 1)
      setIsTyping(false)
    }, 800)
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
  ).map(word => vocabularyList.find(v => v.word.toLowerCase() === word.toLowerCase()))
    .filter(Boolean) as Vocabulary[]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 px-4 py-3 bg-card/80 backdrop-blur-sm border-b border-border">
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
        <div className="h-1 bg-secondary rounded-full overflow-hidden max-w-md mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-electric-purple to-danger-red"
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

      {/* Messages Container */}
      <div className="relative z-10 max-w-md mx-auto px-4 py-6 pb-32 min-h-[calc(100vh-180px)]">
        {visibleMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isUser={message.sender === 'You'}
            wordStates={wordStates}
            vocabularyList={vocabularyList}
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

      {/* Bottom Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4 z-10">
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
    </div>
  )
}
