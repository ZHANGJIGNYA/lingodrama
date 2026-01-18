// LingoDrama 数据库类型定义

export interface Vocabulary {
  id: string
  user_id: string
  word: string
  definition: string
  part_of_speech?: string
  example_sentence?: string
  difficulty_level: number // 1-5
  emotional_intensity?: 'critical' | 'social' | 'vibe'
  tags: string[]
  next_review_date: string
  review_count: number
  mastery_level: number // 0-100
  easiness_factor?: number // SM-2 算法难度因子，默认 2.5
  interval?: number // 当前复习间隔天数
  created_at: string
  updated_at: string
}

export interface Script {
  id: string
  user_id: string
  vocabulary_ids: string[]
  content: ScriptLine[]
  genre: 'drama' | 'thriller' | 'romance' | 'comedy'
  scene_description?: string
  scene_keywords: string[]
  background_image_url?: string
  created_at: string
}

export interface ScriptLine {
  speaker: string
  line: string
  keywords: string[] // 本句包含的目标词汇
}

export interface ReviewSession {
  id: string
  user_id: string
  vocabulary_id: string
  script_id?: string
  reviewed_at: string
  time_spent_seconds?: number
}

export interface QuizSession {
  id: string
  user_id: string
  quiz_date: string
  words_tested: QuizQuestion[]
  total_score: number
  total_questions: number
  completed_at?: string
  failed_at_question?: number
  created_at: string
}

export interface QuizQuestion {
  vocabulary_id: string
  mode: 'critical' | 'social' | 'vibe'
  correct: boolean
  time_taken: number // 秒
  selected_answer?: string
}

export interface UserStats {
  user_id: string
  total_vocabulary: number
  words_due_today: number
  words_mastered: number
  current_streak_days: number
  longest_streak_days: number
  last_study_date?: string
  updated_at: string
}

// 用户设置
export interface UserSettings {
  user_id: string
  // 英语水平 (CEFR 标准)
  english_level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' // A1=初级, A2=初中级, B1=中级, B2=中高级, C1=高级
  // 释义偏好
  definition_preference: 'simple_english' | 'native_language' // 简短英语 or 母语
  native_language: 'zh-CN' | 'zh-TW' | 'ja' | 'ko' | 'es' | 'fr' | 'de' // 母语
  // 剧情偏好
  genre_preference: 'romance' | 'workplace' | 'mystery' | 'slice_of_life' | 'mixed' // 霸总/职场/悬疑/生活/混合
  // 性别设置（影响剧情视角）
  gender: 'male' | 'female' | 'unspecified'
  // 复习设置
  words_per_review: 3 | 5 | 8 // 每次复习的单词数量
  // 更新时间
  updated_at: string
  created_at: string
}

// 新的剧情结构（互动选择式）
export interface InteractiveScript {
  id: string
  user_id: string
  vocabulary_ids: string[] // 本剧情复习的词汇
  genre: 'romance' | 'workplace' | 'mystery' | 'slice_of_life'
  scenarios: InteractiveScenario[] // 每个单词一个场景
  created_at: string
}

export interface InteractiveScenario {
  id: string
  vocabulary_id: string
  target_word: string // 要测试的单词
  context: string // 场景描述（英文）
  context_aids?: ContextAid[] // 场景中超出用户水平的词的辅助说明
  choices: Choice[] // 选项（2-4个）
  correct_choice_id: string
  success_feedback: string // 选对后的反馈（用户母语）
  failure_feedback: string // 选错后的反馈（用户母语）
  player_role?: string // 玩家角色（如"Detective", "CEO's Assistant"）
}

export interface ContextAid {
  word: string // 超纲词
  explanation: string // 母语翻译或简单英语解释
}

export interface Choice {
  id: string
  text: string // 选项文本（英文）
  is_correct: boolean
  consequence?: string // 选择后的后果描述（可选）
}

// 旧的聊天式剧情（保留以兼容）
export interface ChatScript {
  id: string
  user_id: string
  vocabulary_ids: string[] // 本剧情复习的词汇
  genre: 'romance' | 'workplace' | 'mystery' | 'slice_of_life'
  messages: ChatMessage[] // 聊天消息流
  background_image_url?: string
  created_at: string
}

export interface ChatMessage {
  id: string
  speaker: string // 说话人名字
  is_user: boolean // 是否是用户视角
  content: string // 消息内容
  highlighted_words?: HighlightedWord[] // 需要高亮的单词
  emotion?: 'neutral' | 'excited' | 'nervous' | 'serious' // 情绪
  delay?: number // 延迟显示时间（毫秒）
}

export interface HighlightedWord {
  word: string // 单词
  vocabulary_id: string
  style: 'blur' | 'shake' | 'redline' | 'glow' // 高亮样式
  definition_simple_english?: string // 简单英语释义
  definition_native?: string // 母语释义（中文/日语/韩语等）
}

// 新的 Quiz 剧情模式
export interface StoryQuiz {
  id: string
  vocabulary_ids: string[]
  genre: 'romance' | 'workplace' | 'slice_of_life'
  theme: string // 主题，如 "与CEO的约会"
  messages: StoryMessage[] // 剧情消息
  background_image_url?: string
}

export interface StoryMessage {
  id: string
  type: 'narration' | 'dialogue' | 'choice' | 'feedback' // 旁白/对话/选择/反馈
  speaker?: string
  content: string
  is_user?: boolean
  // 选择题相关
  question?: QuizChoice
  // 反馈相关
  is_correct?: boolean
  correct_answer?: string
}

export interface QuizChoice {
  vocabulary_id: string
  prompt: string // 提示文本，如 "你该怎么回复？"
  options: QuizOption[]
  correct_answer: string
}

export interface QuizOption {
  id: string
  text: string // 选项文本
  word: string // 对应的单词
  is_correct: boolean
}

// API 请求/响应类型
export interface CreateVocabularyRequest {
  words: string[] // 批量输入的单词列表
}

export interface AIAnalysisResponse {
  word: string
  definition: string
  part_of_speech: string
  example_sentence: string
  difficulty_level: number
  emotional_intensity: 'critical' | 'social' | 'vibe'
  tags: string[]
}

export interface GenerateScriptRequest {
  vocabulary_ids: string[]
  genre?: 'drama' | 'thriller' | 'romance' | 'comedy'
}

export interface QuizMode {
  type: 'critical' | 'social' | 'vibe'
  vocabulary: Vocabulary
  options: string[] // 4个选项
  correctAnswer: string
}
