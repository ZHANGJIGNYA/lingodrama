'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { QuizMode } from '@/lib/types'

interface CriticalModeProps {
  quiz: QuizMode
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

export function CriticalMode({ quiz, questionNumber, totalQuestions, onAnswer }: CriticalModeProps) {
  const [timeLeft, setTimeLeft] = useState(10)
  const [selected, setSelected] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  // 倒计时
  useEffect(() => {
    if (isAnswered) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // 时间到，自动判错
          clearInterval(timer)
          handleSelect('TIMEOUT')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isAnswered])

  const handleSelect = (answer: string) => {
    if (isAnswered) return

    setSelected(answer)
    setIsAnswered(true)

    const isCorrect = answer === quiz.correctAnswer

    onAnswer(isCorrect)
  }

  const isCorrect = selected === quiz.correctAnswer
  const isTimeout = selected === 'TIMEOUT'

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* CRT 扫描线效果 */}
      <div className="crt-scanlines absolute inset-0 z-10 pointer-events-none" />

      {/* 红色警报背景闪烁 */}
      {!isAnswered && (
        <motion.div
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute inset-0 bg-destructive/20"
        />
      )}

      {/* 倒计时大数字 */}
      <div className="absolute top-8 left-0 right-0 text-center z-20">
        <motion.div
          key={timeLeft}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-8xl font-mono font-bold ${
            timeLeft <= 3 ? 'text-destructive' : 'text-warning'
          }`}
        >
          {timeLeft}
        </motion.div>
        <p className="text-sm text-gray-400 mt-2">SECONDS REMAINING</p>
      </div>

      {/* 进度条 */}
      <div className="absolute top-32 left-4 right-4 z-20">
        <div className="bg-gray-800 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${((totalQuestions - questionNumber + 1) / totalQuestions) * 100}%` }}
            className="h-full bg-destructive"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          QUESTION {questionNumber} / {totalQuestions}
        </p>
      </div>

      {/* 题目区域 */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* 警报标题 */}
          <div className="mb-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block bg-destructive/20 border-2 border-destructive px-6 py-3 rounded-lg mb-4"
            >
              <p className="text-destructive font-bold text-lg tracking-wider">
                ⚠ CRITICAL ALERT
              </p>
            </motion.div>

            <h2 className="text-4xl font-mono font-bold text-white mb-2">
              {quiz.vocabulary.word.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-400 font-mono">
              SELECT THE CORRECT MEANING
            </p>
          </div>

          {/* 选项 */}
          <div className="space-y-3">
            {quiz.options.map((option, index) => {
              const isThisCorrect = option === quiz.correctAnswer
              const isThisSelected = option === selected

              let bgColor = 'bg-gray-800 border-gray-700'
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
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isAnswered ? { scale: 1.02, x: 5 } : {}}
                  whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-lg border-2 text-left font-medium transition-all ${bgColor} ${textColor} disabled:cursor-not-allowed`}
                >
                  <span className="font-mono text-gray-500 mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </motion.button>
              )
            })}
          </div>

          {/* 结果反馈 */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 p-6 rounded-lg border-2 text-center ${
                isTimeout
                  ? 'bg-gray-800 border-gray-600'
                  : isCorrect
                  ? 'bg-success/20 border-success neon-border'
                  : 'bg-destructive/20 border-destructive'
              }`}
            >
              <p className={`text-3xl font-bold mb-2 ${
                isTimeout ? 'text-gray-400' : isCorrect ? 'text-success' : 'text-destructive'
              }`}>
                {isTimeout ? '⏱ TIME OUT' : isCorrect ? '✓ BOMB DEFUSED' : '✗ BOOM'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-gray-400">
                  正确答案：{quiz.correctAnswer}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
