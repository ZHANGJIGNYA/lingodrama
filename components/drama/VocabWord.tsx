'use client'

import type { ReviewType } from '@/lib/types'

interface VocabWordProps {
  word: string
  type: ReviewType
  revealed?: boolean
  onClick: () => void
}

export default function VocabWord({ word, type, revealed = false, onClick }: VocabWordProps) {
  // For partial_mask: show first 3 letters + underscores
  const getMaskedWord = (word: string) => {
    const visibleLength = Math.min(3, Math.floor(word.length / 2))
    const visible = word.slice(0, visibleLength)
    const masked = '_'.repeat(word.length - visibleLength)
    return visible + masked
  }

  const renderWord = () => {
    switch (type) {
      case 'highlight':
        return (
          <span
            onClick={onClick}
            className="text-yellow-300 font-bold underline decoration-wavy decoration-yellow-500 cursor-pointer animate-glow"
          >
            {word}
          </span>
        )

      case 'underline':
        return (
          <span
            onClick={onClick}
            className="text-blue-300 border-b-2 border-dashed border-blue-400 cursor-pointer hover:text-blue-200"
          >
            {word}
          </span>
        )

      case 'context':
        return (
          <span
            onClick={onClick}
            className="bg-purple-600/40 px-1 rounded text-purple-100 cursor-pointer hover:bg-purple-600/60"
          >
            {word}
          </span>
        )

      case 'partial_mask':
        return (
          <span
            onClick={onClick}
            className="bg-yellow-900/50 px-2 py-0.5 rounded font-mono cursor-pointer hover:bg-yellow-900/70"
          >
            {revealed ? word : getMaskedWord(word)}
          </span>
        )

      case 'blank_fill':
        return (
          <span
            onClick={onClick}
            className="inline-flex items-center justify-center bg-orange-600/50 px-3 py-0.5 rounded-md cursor-pointer hover:bg-orange-600/70 min-w-[60px]"
          >
            {revealed ? word : '[?]'}
          </span>
        )

      case 'natural':
        return (
          <span
            onClick={onClick}
            className="cursor-pointer hover:text-gray-300"
          >
            {word}
          </span>
        )

      default:
        return <span>{word}</span>
    }
  }

  return renderWord()
}
