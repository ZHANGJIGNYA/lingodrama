'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CriticalMode } from '@/components/quiz/CriticalMode'
import { SocialMode } from '@/components/quiz/SocialMode'
import { VibeMode } from '@/components/quiz/VibeMode'
import ProjectorLoading from '@/components/ProjectorLoading'
import { Play, ArrowLeft } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import type { QuizMode, Vocabulary } from '@/lib/types'

// Generate quiz questions from vocabulary list
function generateQuizQuestions(vocabularyList: Vocabulary[]): QuizMode[] {
  if (vocabularyList.length === 0) return []

  return vocabularyList.slice(0, 5).map((vocab) => {
    // Determine quiz type based on emotional_intensity or default to cycling through types
    const types: Array<'critical' | 'social' | 'vibe'> = ['critical', 'social', 'vibe']
    const quizType = vocab.emotional_intensity || types[Math.floor(Math.random() * types.length)]

    // Generate wrong options (simplified - in real app would come from AI)
    const correctAnswer = vocab.definition.split(';')[0].trim()
    const wrongOptions = [
      '快乐的；高兴的',
      '缓慢的；迟钝的',
      '明亮的；光明的',
      '安静的；平和的',
      '困难的；艰难的',
      '简单的；容易的',
    ]

    // Shuffle and pick 3 wrong options
    const shuffledWrong = wrongOptions
      .filter(opt => opt !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    // Combine and shuffle all options
    const allOptions = [correctAnswer, ...shuffledWrong].sort(() => Math.random() - 0.5)

    return {
      type: quizType,
      vocabulary: vocab,
      options: allOptions,
      correctAnswer: correctAnswer,
    }
  })
}

export default function QuizPage() {
  const router = useRouter()
  const { vocabularyList, setQuizProgress } = useAppStore()

  // Generate quiz questions from vocabulary
  const quizWords = useMemo(() => generateQuizQuestions(vocabularyList), [vocabularyList])

  const [isStarted, setIsStarted] = useState(false)
  const [showProjector, setShowProjector] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [failedAt, setFailedAt] = useState<number | null>(null)

  const handleStart = () => {
    setShowProjector(true)
    setTimeout(() => {
      setShowProjector(false)
      setIsStarted(true)
    }, 3500)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
      setQuizProgress(currentQuestion + 1)

      if (currentQuestion < quizWords.length - 1) {
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1)
        }, 1500)
      } else {
        setTimeout(() => {
          setIsComplete(true)
          setQuizProgress(quizWords.length)
        }, 1500)
      }
    } else {
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
    setQuizProgress(0)
  }

  // No words available
  if (quizWords.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-3">
            No Words to Quiz
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Add some vocabulary first to start a quiz.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-danger-red text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  // 放映机加载动画
  if (showProjector) {
    return <ProjectorLoading />
  }

  // 启动页
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <button
            onClick={() => router.push('/')}
            className="mb-8 p-2 hover:bg-secondary rounded-lg transition-colors inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-6xl mb-6"
            >
              ⚡
            </motion.div>

            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
              Speed Quiz
            </h1>

            <p className="text-sm text-muted-foreground mb-8">
              Test your reflexes. One wrong answer = Game Over.
            </p>

            <div className="bg-card border border-border rounded-xl p-4 mb-8">
              <div className="text-2xl font-bold text-danger-red mb-1">
                {quizWords.length} Questions
              </div>
              <div className="text-xs text-muted-foreground">
                Critical · Social · Vibe
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="bg-danger-red text-white px-8 py-3.5 rounded-xl font-semibold text-base flex items-center gap-3 mx-auto transition-all shadow-lg shadow-danger-red/30"
            >
              <Play className="w-5 h-5" />
              Start Challenge
            </motion.button>
          </motion.div>
        </div>
      </div>
    )
  }

  // 完成界面
  if (isComplete) {
    const isPassed = failedAt === null

    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <motion.div
            animate={{
              rotate: isPassed ? [0, 10, -10, 0] : 0,
              scale: isPassed ? [1, 1.1, 1] : 1,
            }}
            transition={{ repeat: isPassed ? Infinity : 0, duration: 2 }}
            className="text-7xl mb-6"
          >
            {isPassed ? '🎉' : '💥'}
          </motion.div>

          <h1 className={`font-serif text-2xl font-bold mb-4 ${isPassed ? 'text-luxury-gold' : 'text-danger-red'}`}>
            {isPassed ? '完美通关！' : '挑战失败'}
          </h1>

          <div className="bg-card border border-border rounded-xl p-6 mb-6">
            <p className="text-4xl font-bold text-foreground mb-2">
              {score} / {quizWords.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {isPassed
                ? '恭喜你全部答对！'
                : `第 ${(failedAt ?? 0) + 1} 题答错了，继续加油！`}
            </p>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRestart}
              className="w-full bg-danger-red text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-danger-red/30"
            >
              再来一次
            </motion.button>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-secondary text-muted-foreground py-3.5 px-6 rounded-xl font-medium hover:text-foreground transition-colors"
            >
              返回首页
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // 渲染对应的模式组件
  const currentQuiz = quizWords[currentQuestion]

  return (
    <div className="min-h-screen bg-background">
      {currentQuiz.type === 'critical' && (
        <CriticalMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizWords.length}
          onAnswer={handleAnswer}
        />
      )}

      {currentQuiz.type === 'social' && (
        <SocialMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizWords.length}
          onAnswer={handleAnswer}
        />
      )}

      {currentQuiz.type === 'vibe' && (
        <VibeMode
          quiz={currentQuiz}
          questionNumber={currentQuestion + 1}
          totalQuestions={quizWords.length}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  )
}
