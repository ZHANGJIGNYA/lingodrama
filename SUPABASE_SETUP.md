# Supabase 设置指南

## 步骤 1：创建 Supabase 项目

1. 访问 [Supabase Dashboard](https://app.supabase.com)
2. 点击 "New Project"
3. 填写项目信息：
   - Name: `lingodrama`
   - Database Password: 设置一个强密码（保存好）
   - Region: 选择离用户最近的区域
4. 等待项目初始化（约 2 分钟）

## 步骤 2：执行 SQL Schema

1. 进入项目后，点击左侧菜单 **SQL Editor**
2. 点击 **New Query**
3. 复制 `/supabase-schema.sql` 的全部内容
4. 粘贴到编辑器中
5. 点击 **Run** 执行

✅ 执行成功后会看到 "Success. No rows returned"

## 步骤 3：获取 API 密钥

1. 点击左侧菜单 **Project Settings** → **API**
2. 找到以下信息：
   - **Project URL**: `https://rsrwtjlxdfraropghafy.supabase.co`
   - **anon public key**: `sb_publishable_h-OwjT0pPgEbm7GhToOdjw_IIyhjSO1` (公开密钥)
   - **service_role key**: `eyJhbGc...` (仅服务端使用)

## 步骤 4：配置环境变量

在项目根目录创建 `.env.local` 文件：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Claude API (用于 AI 分析和剧本生成)
CLAUDE_API_KEY=your-claude-api-key-here

# Unsplash API (用于背景图)
UNSPLASH_ACCESS_KEY=your-unsplash-key-here

# Replicate API (用于 AI 生成图片 - 商用后启用)
REPLICATE_API_TOKEN=your-replicate-token-here
```

## 步骤 5：启用 Email Auth

1. 点击左侧菜单 **Authentication** → **Providers**
2. 确保 **Email** 已启用
3. 如果需要 Google/GitHub 登录，也可以在这里配置

## 步骤 6：测试连接

运行开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000` 测试是否正常连接。

## 表结构说明

### 1. vocabulary (词汇表)

- 存储用户添加的所有单词
- 包含 AI 分析结果（词性、难度、情感强度）
- 记录复习进度（next_review_date, mastery_level）

### 2. scripts (剧本表)

- 存储 AI 生成的微剧本
- 关联多个词汇（vocabulary_ids）
- 保存背景图 URL

### 3. review_sessions (复习记录)

- 记录用户每次复习的时间和表现
- 用于统计学习数据

### 4. quiz_sessions (测验记录)

- 记录每日闯关测验的结果
- 保存答题详情（正确/错误、用时）

### 5. user_stats (用户统计)

- 缓存统计数据（总词汇量、今日待复习）
- 记录学习连续天数（streak）

## 安全性说明

✅ **已配置 Row Level Security (RLS)**

- 每个用户只能访问自己的数据
- 所有表都已启用 RLS 策略
- 使用 Supabase Auth 自动管理权限

## 下一步

完成以上步骤后，即可开始前端开发。
