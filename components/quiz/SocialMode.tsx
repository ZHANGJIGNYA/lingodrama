'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Check, X } from 'lucide-react'
import type { QuizMode } from '@/lib/types'

interface SocialModeProps {
  quiz: QuizMode
  questionNumber: number
  totalQuestions: number
  onAnswer: (isCorrect: boolean) => void
}

export function SocialMode({ quiz, questionNumber, totalQuestions, onAnswer }: SocialModeProps) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; isResult?: boolean }>>([
    { text: `Hey! Quick question about English...`, isUser: false },
    { text: `What does "${quiz.vocabulary.word}" mean?`, isUser: false },
  ])
  const [selected, setSelected] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSelect = (answer: string) => {
    if (isAnswered) return

    setSelected(answer)
    setIsAnswered(true)

    const isCorrect = answer === quiz.correctAnswer

    // 用户回复
    setMessages((prev) => [...prev, { text: answer, isUser: true }])

    // 延迟对方反馈
    setTimeout(() => {
      if (isCorrect) {
        setMessages((prev) => [
          ...prev,
          { text: '✓ Perfect! Thanks! ❤️', isUser: false, isResult: true },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { text: '✗ Blocked', isUser: false, isResult: true },
          { text: `(正确答案：${quiz.correctAnswer})`, isUser: false },
        ])
      }

      onAnswer(isCorrect)
    }, 800)
  }

  const isCorrect = selected === quiz.correctAnswer

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900/20 to-background flex flex-col">
      {/* 聊天头部 */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 z-10">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">Friend</h3>
          <p className="text-xs text-muted-foreground">online</p>
        </div>
        <div className="text-xs text-muted-foreground">
          {questionNumber}/{totalQuestions}
        </div>
      </div>

      {/* 聊天内容区 */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.isUser
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : msg.isResult
                    ? isCorrect
                      ? 'bg-success/20 text-success border border-success'
                      : 'bg-destructive/20 text-destructive border border-destructive'
                    : 'bg-card border border-border text-foreground rounded-tl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 正在输入提示 */}
        {!isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex gap-1"
              >
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 选项按钮 */}
      {!isAnswered && (
        <div className="bg-card border-t border-border px-4 py-4 pb-20 space-y-2">
          <p className="text-xs text-muted-foreground mb-3 text-center">
            快速回复
          </p>
          <div className="grid grid-cols-2 gap-2">
            {quiz.options.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(option)}
                className="bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-lg font-medium hover:bg-primary/20 transition-colors text-sm"
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* 完成状态 */}
      {isAnswered && (
        <div className="bg-card border-t border-border px-4 py-6 pb-20">
          <div className={`text-center p-4 rounded-lg ${
            isCorrect ? 'bg-success/10' : 'bg-destructive/10'
          }`}>
            <div className={`text-4xl mb-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? <Check className="w-12 h-12 mx-auto" /> : <X className="w-12 h-12 mx-auto" />}
            </div>
            <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? '回答正确！' : '回答错误'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
