'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Send, Sparkles } from 'lucide-react'
import type { QuizMode } from '@/lib/types'

interface VibeModeProps {
  quiz: QuizMode
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

// Mock 图片（根据单词意境）
const getVibeImage = (word: string) => {
  const imageMap: Record<string, string> = {
    vibrant: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', // 彩色气球
    default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', // 山景
  }
  return imageMap[word.toLowerCase()] || imageMap.default
}

export function VibeMode({ quiz, questionNumber, totalQuestions, onAnswer }: VibeModeProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [imageBlur, setImageBlur] = useState(true)

  const handleSelect = (answer: string) => {
    if (isAnswered) return

    setSelected(answer)
    setIsAnswered(true)

    const isCorrect = answer === quiz.correctAnswer

    // 正确答案：图片变清晰
    if (isCorrect) {
      setImageBlur(false)
    }

    onAnswer(isCorrect)
  }

  const isCorrect = selected === quiz.correctAnswer

  return (
    <div className="min-h-screen bg-black">
      {/* Instagram 风格顶部栏 */}
      <div className="bg-black border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full p-0.5">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-white font-semibold text-sm">aesthetic_test</span>
        </div>
        <div className="text-xs text-gray-400">
          {questionNumber}/{totalQuestions}
        </div>
      </div>

      {/* 图片区域 */}
      <div className="relative">
        <motion.div
          animate={{
            filter: imageBlur ? 'blur(20px) grayscale(100%)' : 'blur(0px) grayscale(0%)',
          }}
          transition={{ duration: 0.8 }}
          className="w-full aspect-square bg-cover bg-center"
          style={{
            backgroundImage: `url(${getVibeImage(quiz.vocabulary.word)})`,
          }}
        />

        {/* 模糊时的覆盖层 */}
        {imageBlur && !isAnswered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-center"
            >
              <p className="text-white text-2xl font-bold mb-2">?</p>
              <p className="text-gray-300 text-sm">找出正确的意思</p>
            </motion.div>
          </div>
        )}

        {/* 成功/失败覆盖层 */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`absolute inset-0 flex items-center justify-center ${
              isCorrect ? 'bg-success/20' : 'bg-destructive/40'
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="text-center"
            >
              <p className="text-6xl mb-4">
                {isCorrect ? '✨' : '❌'}
              </p>
              <p className={`text-2xl font-bold ${isCorrect ? 'text-white' : 'text-white'}`}>
                {isCorrect ? 'Aesthetic Matched!' : 'Wrong Vibe!'}
              </p>
              {!isCorrect && (
                <p className="text-white text-sm mt-2">
                  正确答案：{quiz.correctAnswer}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Instagram 风格交互栏 */}
      <div className="bg-black px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-4 mb-3">
          <Heart className="w-7 h-7 text-white" />
          <MessageCircle className="w-7 h-7 text-white" />
          <Send className="w-7 h-7 text-white" />
        </div>
        <p className="text-white text-sm font-semibold mb-1">
          {quiz.vocabulary.word}
        </p>
        <p className="text-gray-400 text-xs">
          Which meaning matches the vibe? 🎨
        </p>
      </div>

      {/* 选项区域 */}
      <div className="px-4 py-6 pb-24 space-y-3">
        {quiz.options.map((option, index) => {
          const isThisCorrect = option === quiz.correctAnswer
          const isThisSelected = option === selected

          let bgColor = 'bg-gray-900 border-gray-700'
          let textColor = 'text-white'

          if (isAnswered) {
            if (isThisCorrect) {
              bgColor = 'bg-success/20 border-success'
              textColor = 'text-success'
            } else if (isThisSelected) {
              bgColor = 'bg-destructive/20 border-destructive'
              textColor = 'text-destructive'
            }
          }

          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(option)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${bgColor} ${textColor} disabled:cursor-not-allowed`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAnswered && isThisCorrect ? 'bg-success' : 'bg-gray-700'
                }`}>
                  <span className="text-white font-semibold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
