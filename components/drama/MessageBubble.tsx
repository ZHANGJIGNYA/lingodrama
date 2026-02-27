'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { DramaMessage, WordState, Vocabulary } from '@/lib/types'
import VocabWord from './VocabWord'

interface MessageBubbleProps {
  message: DramaMessage
  isUser: boolean
  wordStates: Record<string, WordState>
  vocabularyList: Vocabulary[]
  onWordClick: (word: string, vocab: Vocabulary) => void
  onWordReveal: (messageId: string, vocabIndex: number) => void
}

export default function MessageBubble({
  message,
  isUser,
  wordStates,
  vocabularyList,
  onWordClick,
  onWordReveal
}: MessageBubbleProps) {
  // Parse message text and replace vocab words with interactive components
  const renderText = () => {
    if (message.isImage) {
      return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-gray-300 text-sm">{message.text}</div>
        </div>
      )
    }

    let text = message.text
    const parts: (string | React.ReactElement)[] = []
    let lastIndex = 0

    // Sort vocabs by their position in the text (longest first to avoid partial matches)
    const sortedVocabs = [...message.vocabs].sort((a, b) => b.word.length - a.word.length)

    // Find all vocab occurrences
    const occurrences: Array<{ start: number; end: number; vocab: typeof sortedVocabs[0]; index: number }> = []

    sortedVocabs.forEach((vocab, vocabIndex) => {
      // Handle different display patterns based on type
      let searchPattern: string
      if (vocab.type === 'partial_mask') {
        // For partial_mask, search for the pattern like "sus_____"
        const visibleLength = Math.min(3, Math.floor(vocab.word.length / 2))
        const visible = vocab.word.slice(0, visibleLength)
        searchPattern = visible + '_'.repeat(vocab.word.length - visibleLength)
      } else if (vocab.type === 'blank_fill') {
        searchPattern = '[?]'
      } else if (vocab.type === 'highlight' || vocab.type === 'context') {
        // For highlight and context, look for *word*
        searchPattern = `*${vocab.word}*`
      } else {
        searchPattern = vocab.word
      }

      const index = text.indexOf(searchPattern)
      if (index !== -1) {
        occurrences.push({
          start: index,
          end: index + searchPattern.length,
          vocab,
          index: vocabIndex
        })
      }
    })

    // Sort by position
    occurrences.sort((a, b) => a.start - b.start)

    // Build the text with vocab words
    occurrences.forEach((occurrence) => {
      // Add text before this vocab
      if (lastIndex < occurrence.start) {
        parts.push(text.slice(lastIndex, occurrence.start))
      }

      // Find the actual vocabulary object
      const actualVocab = vocabularyList.find(v =>
        v.word.toLowerCase() === occurrence.vocab.word.toLowerCase()
      )

      const key = `${message.id}-${occurrence.index}`
      const wordState = wordStates[key]

      // Add the vocab word component
      parts.push(
        <VocabWord
          key={key}
          word={occurrence.vocab.word}
          type={occurrence.vocab.type}
          revealed={wordState?.revealed}
          onClick={() => {
            if (actualVocab) {
              onWordClick(occurrence.vocab.word, actualVocab)
              onWordReveal(message.id, occurrence.index)
            }
          }}
        />
      )

      lastIndex = occurrence.end
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    // Clean up asterisks from highlight words
    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        return part.replace(/\*/g, '')
      }
      return part
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-300">
          {message.avatar || message.sender.charAt(0).toUpperCase()}
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-purple-600 text-white rounded-tr-sm'
            : 'bg-gray-800 text-gray-100 rounded-tl-sm'
        }`}
      >
        {!isUser && (
          <div className="text-xs text-gray-400 mb-1 font-semibold">
            {message.sender}
          </div>
        )}
        <div className="text-base leading-relaxed">
          {renderText()}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-sm font-semibold text-white">
          {message.avatar || message.sender.charAt(0).toUpperCase()}
        </div>
      )}
    </motion.div>
  )
}
