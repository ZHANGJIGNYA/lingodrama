import { create } from "zustand";
import type { UserStats, Vocabulary, UserSettings } from "@/lib/types";

interface AppState {
  // 用户统计
  userStats: UserStats | null;
  setUserStats: (stats: UserStats) => void;

  // 用户设置
  userSettings: UserSettings | null;
  setUserSettings: (settings: UserSettings) => void;

  // 界面语言
  interfaceLanguage: "en" | "zh";
  setInterfaceLanguage: (lang: "en" | "zh") => void;

  // 主题
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;

  // 每日目标（默认隐藏）
  dailyGoal: number;
  showDailyGoal: boolean;
  setDailyGoal: (goal: number) => void;
  setShowDailyGoal: (show: boolean) => void;

  // 词汇数据
  vocabularyList: Vocabulary[];
  setVocabularyList: (list: Vocabulary[]) => void;
  addVocabulary: (vocab: Vocabulary) => void;
  updateVocabulary: (id: string, updates: Partial<Vocabulary>) => void;
  removeVocabulary: (id: string) => void;

  // 已推送到故事的词汇
  storyVocabulary: Vocabulary[];
  pushWordsToStory: (words: Vocabulary[]) => void;

  // 今日待复习词汇
  wordsToReview: Vocabulary[];
  setWordsToReview: (words: Vocabulary[]) => void;

  // 到期必须Quiz的词汇
  dueForQuiz: Vocabulary[];
  updateDueForQuiz: () => void;

  // Quiz 状态
  currentQuizWords: Vocabulary[];
  setCurrentQuizWords: (words: Vocabulary[]) => void;
  quizProgress: number;
  setQuizProgress: (progress: number) => void;

  // 控制是否隐藏 BottomNav 的开关
  hideBottomNav: boolean;
  setHideBottomNav: (hide: boolean) => void;

  // 加载状态
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 默认用户设置
const defaultUserSettings: UserSettings = {
  user_id: "mock",
  english_level: "B1",
  definition_preference: "native_language",
  native_language: "zh-CN",
  genre_preference: "romance",
  gender: "unspecified",
  words_per_review: 3,
  updated_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
};

// 默认用户统计
const defaultUserStats: UserStats = {
  user_id: "mock",
  total_vocabulary: 0,
  words_due_today: 0,
  words_mastered: 0,
  current_streak_days: 12,
  longest_streak_days: 15,
  last_study_date: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  userStats: defaultUserStats,
  userSettings: defaultUserSettings,
  interfaceLanguage: "en",
  theme: "dark",
  dailyGoal: 10,
  showDailyGoal: false, // 默认隐藏
  vocabularyList: [],
  storyVocabulary: [],
  wordsToReview: [],
  dueForQuiz: [],
  currentQuizWords: [],
  quizProgress: 0,
  isLoading: false,
  hideBottomNav: false, // 默认不隐藏

  // Actions
  setUserStats: (stats) => set({ userStats: stats }),

  setUserSettings: (settings) => set({ userSettings: settings }),

  setInterfaceLanguage: (lang) => set({ interfaceLanguage: lang }),

  setTheme: (theme) => set({ theme }),

  setDailyGoal: (goal) => set({ dailyGoal: goal }),

  setShowDailyGoal: (show) => set({ showDailyGoal: show }),

  setVocabularyList: (list) => set({ vocabularyList: list }),

  setHideBottomNav: (hide) => set({ hideBottomNav: hide }),

  addVocabulary: (vocab) =>
    set((state) => ({
      vocabularyList: [...state.vocabularyList, vocab],
      wordsToReview: [...state.wordsToReview, vocab],
    })),

  updateVocabulary: (id: string, updates: Partial<Vocabulary>) =>
    set((state) => ({
      vocabularyList: state.vocabularyList.map((v) =>
        v.id === id ? { ...v, ...updates } : v,
      ),
      wordsToReview: state.wordsToReview.map((v) =>
        v.id === id ? { ...v, ...updates } : v,
      ),
    })),

  removeVocabulary: (id) =>
    set((state) => ({
      vocabularyList: state.vocabularyList.filter((v) => v.id !== id),
      wordsToReview: state.wordsToReview.filter((v) => v.id !== id),
    })),

  pushWordsToStory: (words) =>
    set((state) => {
      const existingIds = new Set(state.storyVocabulary.map((v) => v.id));
      const newWords = words.filter((w) => !existingIds.has(w.id));
      return {
        storyVocabulary: [...state.storyVocabulary, ...newWords],
      };
    }),

  setWordsToReview: (words) => set({ wordsToReview: words }),

  // 检查哪些词汇到期需要 Quiz（间隔重复）
  updateDueForQuiz: () => {
    const { vocabularyList } = get();
    const now = new Date();
    const dueWords = vocabularyList.filter((v) => {
      if (!v.next_review_date) return false;
      return new Date(v.next_review_date) <= now && v.review_count > 0;
    });
    set({ dueForQuiz: dueWords });
  },

  setCurrentQuizWords: (words) => set({ currentQuizWords: words }),

  setQuizProgress: (progress) => set({ quizProgress: progress }),

  setIsLoading: (loading) => set({ isLoading: loading }),
}));
