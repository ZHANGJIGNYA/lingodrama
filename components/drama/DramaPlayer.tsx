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
      // Episode complete
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

    // Auto-close after 3 seconds
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
    <div className={`min-h-screen bg-gradient-to-br ${series.gradient} relative overflow-hidden`}>
      {/* Film grain effect */}
      <div className="film-grain absolute inset-0 pointer-events-none opacity-30" />

      {/* Header */}
      <div className="relative z-10 px-4 py-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>

          <div className="flex-1 text-center">
            <div className="text-sm text-gray-300">Ep{episode.id}: {episode.title}</div>
          </div>

          <button
            onClick={() => setShowVocabPanel(!showVocabPanel)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <List className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
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
            className="fixed right-0 top-0 bottom-0 w-80 bg-black/90 backdrop-blur-lg border-l border-white/20 z-20 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Words in this Episode</h3>
              <button
                onClick={() => setShowVocabPanel(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {episodeVocabs.map((vocab) => (
                <div
                  key={vocab.id}
                  onClick={() => handleWordClick(vocab.word, vocab)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                >
                  <div className="text-white font-semibold">{vocab.word}</div>
                  <div className="text-sm text-gray-400">{vocab.definition}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 pb-32 min-h-[calc(100vh-180px)]">
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
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-xl">
              {episode.messages[currentMsgIndex + 1]?.avatar}
            </div>
            <div className="bg-gray-800 px-6 py-4 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 z-10">
        <div className="max-w-3xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            disabled={isTyping}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-2xl transition-all ${
              isComplete
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            } ${isTyping ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isTyping ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Loading...
              </>
            ) : isComplete ? (
              <>Complete Episode ✓</>
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5" />
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
