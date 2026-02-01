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
          {/* Backdrop with spotlight effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Spotlight beam */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-64 h-96 pointer-events-none"
            style={{
              background: 'conic-gradient(from 180deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)',
              clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Translation Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 shadow-2xl border border-purple-500/50">
              {/* Animated glow */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"
              />

              <div className="relative">
                {/* Word with pronunciation */}
                <div className="flex items-center justify-between mb-4">
                  <motion.h3
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                  >
                    {vocab.word}
                  </motion.h3>
                  <button
                    onClick={handleSpeak}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Pronounce word"
                  >
                    <Volume2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Definition */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-3"
                >
                  <div className="text-sm text-purple-300 mb-1">Definition</div>
                  <div className="text-lg text-white font-medium">
                    {vocab.definition}
                  </div>
                </motion.div>

                {/* Example */}
                {vocab.example_sentence && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-sm text-purple-300 mb-1">Example</div>
                    <div className="text-sm text-gray-300 italic bg-white/5 rounded-lg p-3 border-l-2 border-purple-500">
                      {vocab.example_sentence}
                    </div>
                  </motion.div>
                )}

                {/* Auto-close hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xs text-purple-400 text-center mt-4"
                >
                  Tap anywhere to close
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
