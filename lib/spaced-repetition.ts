/**
 * 艾宾浩斯遗忘曲线 & 间隔重复算法
 * Ebbinghaus Forgetting Curve & Spaced Repetition (SuperMemo SM-2)
 */

export interface ReviewResult {
  quality: 0 | 1 | 2 | 3 | 4 | 5 // 记忆质量评分
  // 0: 完全忘记
  // 1: 错误，但想起来了
  // 2: 错误，费力想起
  // 3: 正确，但困难
  // 4: 正确，有点犹豫
  // 5: 完全记住，轻松回答
}

export interface VocabularyReviewData {
  review_count: number
  mastery_level: number // 0-100
  easiness_factor?: number // SM-2 算法的难度因子，默认 2.5
  interval?: number // 当前间隔天数
  next_review_date: string
}

/**
 * 计算下次复习时间（基于艾宾浩斯遗忘曲线）
 * @param reviewCount 已复习次数
 * @param quality 本次记忆质量 (0-5)
 * @param currentEasiness 当前难度因子（默认 2.5）
 * @param currentInterval 当前间隔天数
 * @returns 更新后的复习数据
 */
export function calculateNextReview(
  reviewCount: number,
  quality: ReviewResult['quality'],
  currentEasiness: number = 2.5,
  currentInterval: number = 0
): VocabularyReviewData {
  // 记忆质量太差（<3），重置间隔
  if (quality < 3) {
    return {
      review_count: reviewCount + 1,
      mastery_level: Math.max(0, reviewCount * 10 - 10), // 降低掌握度
      easiness_factor: Math.max(1.3, currentEasiness - 0.2), // 降低难度因子
      interval: 1, // 明天再复习
      next_review_date: getDateAfterDays(1),
    }
  }

  // 更新难度因子（SM-2 算法）
  const newEasiness = Math.max(
    1.3,
    currentEasiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  // 计算新的间隔
  let newInterval: number

  if (reviewCount === 0) {
    newInterval = 1 // 第一次：1天后
  } else if (reviewCount === 1) {
    newInterval = 6 // 第二次：6天后
  } else {
    // 后续：上次间隔 × 难度因子
    newInterval = Math.round(currentInterval * newEasiness)
  }

  // 计算掌握度（0-100）
  const masteryIncrease = quality * 5 // quality 5 = +25%, quality 4 = +20%
  const newMastery = Math.min(100, (reviewCount + 1) * 15 + masteryIncrease)

  return {
    review_count: reviewCount + 1,
    mastery_level: newMastery,
    easiness_factor: newEasiness,
    interval: newInterval,
    next_review_date: getDateAfterDays(newInterval),
  }
}

/**
 * 获取N天后的日期（ISO格式）
 */
function getDateAfterDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

/**
 * 检查单词是否需要复习
 */
export function needsReview(nextReviewDate: string): boolean {
  return new Date(nextReviewDate) <= new Date()
}

/**
 * 获取今日待复习单词
 */
export function getTodayReviewWords<T extends { next_review_date: string; mastery_level: number }>(
  vocabularyList: T[]
): T[] {
  return vocabularyList
    .filter((word) => needsReview(word.next_review_date))
    .filter((word) => word.mastery_level < 100) // 已完全掌握的不再复习
    .sort((a, b) => {
      // 优先复习：掌握度低的 & 复习日期早的
      const masteryDiff = a.mastery_level - b.mastery_level
      if (masteryDiff !== 0) return masteryDiff
      return new Date(a.next_review_date).getTime() - new Date(b.next_review_date).getTime()
    })
}

/**
 * 艾宾浩斯标准间隔（简化版，不使用 SM-2）
 */
export const EBBINGHAUS_INTERVALS = {
  0: 1, // 第1次复习：1天后
  1: 2, // 第2次复习：2天后
  2: 4, // 第3次复习：4天后
  3: 7, // 第4次复习：7天后
  4: 15, // 第5次复习：15天后
  5: 30, // 第6次复习：30天后
  6: 60, // 第7次复习：60天后
} as const

/**
 * 简化版：根据复习次数获取下次复习间隔
 */
export function getSimpleNextInterval(reviewCount: number, wasCorrect: boolean): number {
  if (!wasCorrect) {
    return 1 // 答错了，明天再复习
  }

  const count = Math.min(reviewCount, 6) as keyof typeof EBBINGHAUS_INTERVALS
  return EBBINGHAUS_INTERVALS[count]
}
