import { create } from 'zustand'
import type { UserStats, Vocabulary, UserSettings } from '@/lib/types'

interface AppState {
  // 用户统计
  userStats: UserStats | null
  setUserStats: (stats: UserStats) => void

  // 用户设置
  userSettings: UserSettings | null
  setUserSettings: (settings: UserSettings) => void

  // 界面语言
  interfaceLanguage: 'en' | 'zh'
  setInterfaceLanguage: (lang: 'en' | 'zh') => void

  // 词汇数据
  vocabularyList: Vocabulary[]
  setVocabularyList: (list: Vocabulary[]) => void
  addVocabulary: (vocab: Vocabulary) => void
  removeVocabulary: (id: string) => void

  // 已推送到故事的词汇
  storyVocabulary: Vocabulary[]
  pushWordsToStory: (words: Vocabulary[]) => void

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
  words_per_review: 3,
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
}

// 默认用户统计
const defaultUserStats: UserStats = {
  user_id: 'mock',
  total_vocabulary: 0,
  words_due_today: 0,
  words_mastered: 0,
  current_streak_days: 12,
  longest_streak_days: 15,
  last_study_date: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export const useAppStore = create<AppState>((set) => ({
  // 初始状态 - 空数据，用户自己添加
  userStats: defaultUserStats,
  userSettings: defaultUserSettings,
  interfaceLanguage: 'en',
  vocabularyList: [],
  storyVocabulary: [],
  wordsToReview: [],
  currentQuizWords: [],
  quizProgress: 0,
  isLoading: false,

  // Actions
  setUserStats: (stats) => set({ userStats: stats }),

  setUserSettings: (settings) => set({ userSettings: settings }),

  setInterfaceLanguage: (lang) => set({ interfaceLanguage: lang }),

  setVocabularyList: (list) => set({ vocabularyList: list }),

  addVocabulary: (vocab) =>
    set((state) => ({
      vocabularyList: [...state.vocabularyList, vocab],
      wordsToReview: [...state.wordsToReview, vocab],
    })),

  removeVocabulary: (id) =>
    set((state) => ({
      vocabularyList: state.vocabularyList.filter((v) => v.id !== id),
      wordsToReview: state.wordsToReview.filter((v) => v.id !== id),
    })),

  pushWordsToStory: (words) =>
    set((state) => {
      // 避免重复推送
      const existingIds = new Set(state.storyVocabulary.map((v) => v.id))
      const newWords = words.filter((w) => !existingIds.has(w.id))
      return {
        storyVocabulary: [...state.storyVocabulary, ...newWords],
      }
    }),

  setWordsToReview: (words) => set({ wordsToReview: words }),

  setCurrentQuizWords: (words) => set({ currentQuizWords: words }),

  setQuizProgress: (progress) => set({ quizProgress: progress }),

  setIsLoading: (loading) => set({ isLoading: loading }),
}))
