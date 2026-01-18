-- LingoDrama Database Schema
-- 使用 Supabase PostgreSQL

-- ============================================
-- 1. 词汇表 (vocabulary)
-- ============================================
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 基础信息
  word TEXT NOT NULL,
  definition TEXT NOT NULL,
  part_of_speech TEXT, -- 词性: noun, verb, adjective, etc.
  example_sentence TEXT,

  -- AI 分析结果
  difficulty_level INTEGER DEFAULT 1, -- 1-5 难度等级
  emotional_intensity TEXT, -- critical, social, vibe (用于 Quiz 模式分类)
  tags JSONB DEFAULT '[]'::jsonb, -- ["action", "emergency", "medical"]

  -- 复习相关
  next_review_date TIMESTAMPTZ DEFAULT NOW(),
  review_count INTEGER DEFAULT 0,
  mastery_level INTEGER DEFAULT 0, -- 0-100 掌握程度

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 索引优化
  CONSTRAINT unique_user_word UNIQUE(user_id, word)
);

-- 索引：加速查询
CREATE INDEX idx_vocabulary_user_id ON vocabulary(user_id);
CREATE INDEX idx_vocabulary_next_review ON vocabulary(user_id, next_review_date);
CREATE INDEX idx_vocabulary_mastery ON vocabulary(user_id, mastery_level);

-- ============================================
-- 2. 剧本表 (scripts)
-- ============================================
CREATE TABLE scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 关联词汇
  vocabulary_ids UUID[] NOT NULL, -- 本剧本复习的词汇 ID 数组

  -- 剧本内容
  content JSONB NOT NULL, -- 结构：[{ speaker: "Doctor", line: "The patient is critical!", keywords: ["critical"] }]
  genre TEXT DEFAULT 'drama', -- drama, thriller, romance, comedy
  scene_description TEXT, -- "Hospital emergency room at midnight"

  -- 视觉相关
  scene_keywords TEXT[], -- ["hospital", "emergency", "night"]
  background_image_url TEXT, -- Unsplash/AI 生成的背景图

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_vocabulary ON scripts USING GIN(vocabulary_ids);

-- ============================================
-- 3. 复习记录表 (review_sessions)
-- ============================================
CREATE TABLE review_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vocabulary_id UUID NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
  script_id UUID REFERENCES scripts(id) ON DELETE SET NULL,

  -- 复习结果
  reviewed_at TIMESTAMPTZ DEFAULT NOW(),
  time_spent_seconds INTEGER -- 用户阅读时长
);

-- 索引：review_sessions
CREATE INDEX idx_review_user_id ON review_sessions(user_id);
CREATE INDEX idx_review_vocabulary_id ON review_sessions(vocabulary_id);

-- ============================================
-- 4. 测验记录表 (quiz_sessions)
-- ============================================
CREATE TABLE quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 测验详情
  quiz_date DATE DEFAULT CURRENT_DATE,
  words_tested JSONB NOT NULL, -- [{ vocabulary_id: "xxx", mode: "critical", correct: true, time_taken: 3.5 }]
  total_score INTEGER DEFAULT 0, -- 答对题数
  total_questions INTEGER DEFAULT 0,

  -- 闯关状态
  completed_at TIMESTAMPTZ,
  failed_at_question INTEGER, -- 失败于第几题（null 表示全部通过）

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引：quiz_sessions
CREATE INDEX idx_quiz_user_id ON quiz_sessions(user_id);
CREATE INDEX idx_quiz_date ON quiz_sessions(user_id, quiz_date);

-- ============================================
-- 5. 用户统计表 (user_stats) - 缓存统计数据
-- ============================================
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 词汇统计
  total_vocabulary INTEGER DEFAULT 0,
  words_due_today INTEGER DEFAULT 0,
  words_mastered INTEGER DEFAULT 0, -- mastery_level >= 80

  -- 学习统计
  current_streak_days INTEGER DEFAULT 0, -- 连续学习天数
  longest_streak_days INTEGER DEFAULT 0,
  last_study_date DATE,

  -- 更新时间
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. 用户设置表 (user_settings)
-- ============================================
CREATE TABLE user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 英语水平 (CEFR 标准)
  english_level TEXT DEFAULT 'B1' CHECK (english_level IN ('A1', 'A2', 'B1', 'B2', 'C1')), -- A1=初级, A2=初中级, B1=中级, B2=中高级, C1=高级

  -- 释义偏好
  definition_preference TEXT DEFAULT 'native_language' CHECK (definition_preference IN ('simple_english', 'native_language')),
  native_language TEXT DEFAULT 'zh-CN', -- 母语

  -- 剧情偏好
  genre_preference TEXT DEFAULT 'mixed' CHECK (genre_preference IN ('romance', 'workplace', 'mystery', 'slice_of_life', 'mixed')),

  -- 性别设置（影响剧情视角）
  gender TEXT DEFAULT 'unspecified' CHECK (gender IN ('male', 'female', 'unspecified')),

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. 聊天式剧本表 (chat_scripts) - 新的剧本结构
-- ============================================
CREATE TABLE chat_scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 关联词汇
  vocabulary_ids UUID[] NOT NULL,

  -- 剧情信息
  genre TEXT NOT NULL CHECK (genre IN ('romance', 'workplace', 'mystery', 'slice_of_life')),
  theme TEXT, -- 主题，如 "与CEO的约会"
  messages JSONB NOT NULL, -- 聊天消息数组

  -- 视觉相关
  background_image_url TEXT,

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_scripts_user_id ON chat_scripts(user_id);
CREATE INDEX idx_chat_scripts_vocabulary ON chat_scripts USING GIN(vocabulary_ids);

-- ============================================
-- 8. Row Level Security (RLS) 策略
-- ============================================

-- 启用 RLS
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- vocabulary 表策略
CREATE POLICY "Users can view own vocabulary"
  ON vocabulary FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocabulary"
  ON vocabulary FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vocabulary"
  ON vocabulary FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocabulary"
  ON vocabulary FOR DELETE
  USING (auth.uid() = user_id);

-- scripts 表策略
CREATE POLICY "Users can view own scripts"
  ON scripts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scripts"
  ON scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- review_sessions 表策略
CREATE POLICY "Users can view own review sessions"
  ON review_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own review sessions"
  ON review_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- quiz_sessions 表策略
CREATE POLICY "Users can view own quiz sessions"
  ON quiz_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz sessions"
  ON quiz_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- user_stats 表策略
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON user_stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- user_settings 表策略
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- chat_scripts 表策略
CREATE POLICY "Users can view own chat scripts"
  ON chat_scripts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat scripts"
  ON chat_scripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 7. 触发器：自动更新 updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vocabulary_updated_at
  BEFORE UPDATE ON vocabulary
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. 函数：计算今日需复习单词数
-- ============================================
CREATE OR REPLACE FUNCTION get_words_due_today(p_user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)
    FROM vocabulary
    WHERE user_id = p_user_id
    AND next_review_date <= NOW()
    AND mastery_level < 80
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
