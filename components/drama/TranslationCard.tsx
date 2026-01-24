'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Volume2 } from 'lucide-react'
import type { Vocabulary } from '@/lib/types'

interface TranslationCardProps {
  vocab: Vocabulary | null
  onClose: () => void
}

export default function TranslationCard({ vocab, onClose }: TranslationCardProps) {
  const handleSpeak = () => {
    if (vocab && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(vocab.word)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <AnimatePresence>
      {vocab && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
          />

          {/* Translation Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 shadow-2xl border-2 border-purple-500/50">
              {/* Word with pronunciation */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-white">
                  {vocab.word}
                </h3>
                <button
                  onClick={handleSpeak}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Pronounce word"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Chinese definition */}
              <div className="mb-3">
                <div className="text-sm text-purple-300 mb-1">📝 中文释义</div>
                <div className="text-lg text-white font-medium">
                  {vocab.definition}
                </div>
              </div>

              {/* Simple English explanation */}
              {vocab.example_sentence && (
                <div>
                  <div className="text-sm text-purple-300 mb-1">💡 Example</div>
                  <div className="text-sm text-gray-300 italic">
                    {vocab.example_sentence}
                  </div>
                </div>
              )}

              {/* Auto-close hint */}
              <div className="text-xs text-purple-400 text-center mt-4">
                Tap anywhere to close
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
