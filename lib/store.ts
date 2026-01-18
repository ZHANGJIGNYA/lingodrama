import { create } from 'zustand'
import type { UserStats, Vocabulary, UserSettings } from '@/lib/types'

interface AppState {
  // 用户统计
  userStats: UserStats | null
  setUserStats: (stats: UserStats) => void

  // 用户设置
  userSettings: UserSettings | null
  setUserSettings: (settings: UserSettings) => void

  // 词汇数据
  vocabularyList: Vocabulary[]
  setVocabularyList: (list: Vocabulary[]) => void
  addVocabulary: (vocab: Vocabulary) => void

  // 今日待复习词汇
  wordsToReview: Vocabulary[]
  setWordsToReview: (words: Vocabulary[]) => void

  // Quiz 状态
  currentQuizWords: Vocabulary[]
  setCurrentQuizWords: (words: Vocabulary[]) => void
  quizProgress: number // 当前进度 0-5
  setQuizProgress: (progress: number) => void

  // 加载状态
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

// 默认用户设置
const defaultUserSettings: UserSettings = {
  user_id: 'mock',
  english_level: 'B1',
  definition_preference: 'native_language',
  native_language: 'zh-CN',
  genre_preference: 'romance',
  gender: 'unspecified',
  words_per_review: 3, // 默认每次复习3个词
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
}

export const useAppStore = create<AppState>((set) => ({
  // 初始状态
  userStats: null,
  userSettings: defaultUserSettings,
  vocabularyList: [],
  wordsToReview: [],
  currentQuizWords: [],
  quizProgress: 0,
  isLoading: false,

  // Actions
  setUserStats: (stats) => set({ userStats: stats }),

  setUserSettings: (settings) => set({ userSettings: settings }),

  setVocabularyList: (list) => set({ vocabularyList: list }),

  addVocabulary: (vocab) =>
    set((state) => ({
      vocabularyList: [...state.vocabularyList, vocab],
    })),

  setWordsToReview: (words) => set({ wordsToReview: words }),

  setCurrentQuizWords: (words) => set({ currentQuizWords: words }),

  setQuizProgress: (progress) => set({ quizProgress: progress }),

  setIsLoading: (loading) => set({ isLoading: loading }),
}))
