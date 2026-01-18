'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CriticalMode } from '@/components/quiz/CriticalMode'
import { SocialMode } from '@/components/quiz/SocialMode'
import { VibeMode } from '@/components/quiz/VibeMode'
import ProjectorLoading from '@/components/ProjectorLoading'
import { Play } from 'lucide-react'
import type { QuizMode } from '@/lib/types'

// Mock 测验数据
const mockQuizWords: QuizMode[] = [
  {
    type: 'critical',
    vocabulary: {
      id: '1',
      user_id: 'mock',
      word: 'critical',
      definition: '危急的；关键的',
      part_of_speech: 'adjective',
      difficulty_level: 3,
      emotional_intensity: 'critical',
      tags: ['medical'],
      next_review_date: new Date().toISOString(),
      review_count: 0,
      mastery_level: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    options: ['危急的', '快乐的', '缓慢的', '明亮的'],
    correctAnswer: '危急的',
  },
  {
    type: 'social',
    vocabulary: {
      id: '2',
      user_id: 'mock',
      word: 'cynical',
      definition: '愤世嫉俗的',
      part_of_speech: 'adjective',
      difficulty_level: 4,
      emotional_intensity: 'social',
      tags: ['personality'],
      next_review_date: new Date().toISOString(),
      review_count: 0,
      mastery_level: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    options: ['愤世嫉俗的', '热情友好的', '天真善良的', '冷静理性的'],
    correctAnswer: '愤世嫉俗的',
  },
  {
    type: 'vibe',
    vocabulary: {
      id: '3',
      user_id: 'mock',
      word: 'vibrant',
      definition: '充满活力的；鲜艳的',
      part_of_speech: 'adjective',
      difficulty_level: 3,
      emotional_intensity: 'vibe',
      tags: ['visual'],
      next_review_date: new Date().toISOString(),
      review_count: 0,
      mastery_level: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    options: ['充满活力的', '黯淡无光的', '安静沉稳的', '模糊不清的'],
    correctAnswer: '充满活力的',
  },
]

export default function QuizPage() {
  const [isStarted, setIsStarted] = useState(false)
  const [showProjector, setShowProjector] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [failedAt, setFailedAt] = useState<number | null>(null)

  const handleStart = () => {
    setShowProjector(true)
    // 放映机动画播放3.5秒后再显示内容
    setTimeout(() => {
      setShowProjector(false)
      setIsStarted(true)
    }, 3500)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)

      // 移到下一题
      if (currentQuestion < mockQuizWords.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1)
        }, 1500)
      } else {
        // 全部答对，完成
        setTimeout(() => {
          setIsComplete(true)
        }, 1500)
      }
    } else {
      // 答错，记录失败位置
      setFailedAt(currentQuestion)
      setTimeout(() => {
        setIsComplete(true)
      }, 2000)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setIsComplete(false)
    setFailedAt(null)
    setIsStarted(false)
  }

  // 放映机加载动画
  if (showProjector) {
    return <ProjectorLoading />
  }

  // 启动页
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center px-6 film-grain vignette">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-7xl mb-6"
          >
            ⚡
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Speed Quiz
          </h1>

          <p className="text-gray-300 mb-8">
            Test your reflexes. One wrong answer = Game Over.
          </p>

          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 mb-8">
            <div className="text-2xl font-bold text-red-300 mb-2">
              {mockQuizWords.length} Questions
            </div>
            <div className="text-sm text-gray-400">
              Critical · Social · Vibe
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto transition-all shadow-2xl"
          >
            <Play className="w-6 h-6" />
            Start Challenge
          </motion.button>
        </motion.div>
      </div>
    )
  }

  // 完成界面
  if (isComplete) {
    const isPassed = failedAt === null

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-gray-900 to-black px-4 film-grain vignette">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{
              rotate: isPassed ? [0, 10, -10, 0] : 0,
              scale: isPassed ? [1, 1.1, 1] : 1,
            }}
            transition={{ repeat: isPassed ? Infinity : 0, duration: 2 }}
            className="text-8xl mb-6"
          >
            {isPassed ? '🎉' : '💥'}
          </motion.div>

          <h1 className={`text-3xl font-bold mb-4 ${isPassed ? 'text-success' : 'text-destructive'}`}>
            {isPassed ? '完美通关！' : '挑战失败'}
          </h1>

          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <p className="text-4xl font-bold text-foreground mb-2">
              {score} / {mockQuizWords.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {isPassed
                ? '恭喜你全部答对！'
                : `第 ${(failedAt ?? 0) + 1} 题答错了，继续加油！`}
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              再来一次
            </motion.button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-secondary text-secondary-foreground py-4 px-6 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              返回首页
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // 渲染对应的模式组件
  const currentQuiz = mockQuizWords[currentQuestion]

  return (
    <div className="min-h-screen">
      {currentQuiz.type === 'critical' && (
        <CriticalMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={mockQuizWords.length}
          onAnswer={handleAnswer}
        />
      )}

      {currentQuiz.type === 'social' && (
        <SocialMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={mockQuizWords.length}
          onAnswer={handleAnswer}
        />
      )}

      {currentQuiz.type === 'vibe' && (
        <VibeMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={mockQuizWords.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}
