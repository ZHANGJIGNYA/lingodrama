import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

// 初始化 Claude API 客户端
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

// 初始化 Gemini API 客户端
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

// Claude 模型列表
const CLAUDE_MODELS = [
  'claude-3-5-sonnet-20241022',
  'claude-3-5-haiku-20241022',
  'claude-3-haiku-20240307',
]

// Gemini 模型列表
const GEMINI_MODELS = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
]

export async function POST(request: NextRequest) {
  try {
    const { words, genre, userSettings } = await request.json()

    if (!words || words.length === 0) {
      return NextResponse.json(
        { error: 'No words provided' },
        { status: 400 }
      )
    }

    // 构建 AI prompt
    const prompt = buildScriptPrompt(words, genre, userSettings)

    let lastError: any = null

    // 策略1: 先尝试 Claude API
    if (process.env.ANTHROPIC_API_KEY) {
      console.log('🎯 Strategy 1: Trying Claude API...')
      for (const model of CLAUDE_MODELS) {
        try {
          console.log(`🤖 Trying Claude model: ${model}`)

          const message = await anthropic.messages.create({
            model,
            max_tokens: 2000,
            messages: [{ role: 'user', content: prompt }],
          })

          const scriptContent = message.content[0].type === 'text'
            ? message.content[0].text
            : ''

          const script = JSON.parse(scriptContent)

          console.log(`✅ Script generated successfully with Claude ${model}`)
          return NextResponse.json({ script, provider: 'claude', model })

        } catch (error: any) {
          lastError = error
          console.log(`❌ Claude ${model} failed:`, error.message)

          // 如果是负载问题，尝试下一个 Claude 模型
          if (
            error.message?.includes('负载') ||
            error.message?.includes('limit') ||
            error.message?.includes('overload') ||
            error.status === 529
          ) {
            console.log(`⏭️ Trying next Claude model...`)
            continue
          }

          // 其他错误（如 API key 无效），跳到 Gemini
          console.log(`⚠️ Claude error, switching to Gemini...`)
          break
        }
      }
    }

    // 策略2: 尝试 Gemini API
    if (process.env.GEMINI_API_KEY) {
      console.log('🎯 Strategy 2: Trying Gemini API...')
      for (const modelName of GEMINI_MODELS) {
        try {
          console.log(`🤖 Trying Gemini model: ${modelName}`)

          const model = gemini.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(prompt)
          const response = await result.response
          const scriptContent = response.text()

          // 清理可能的 markdown 代码块
          const cleanedContent = scriptContent
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim()

          const script = JSON.parse(cleanedContent)

          console.log(`✅ Script generated successfully with Gemini ${modelName}`)
          return NextResponse.json({ script, provider: 'gemini', model: modelName })

        } catch (error: any) {
          lastError = error
          console.log(`❌ Gemini ${modelName} failed:`, error.message)

          // 如果是负载问题，尝试下一个 Gemini 模型
          if (
            error.message?.includes('quota') ||
            error.message?.includes('limit') ||
            error.message?.includes('overload') ||
            error.status === 429 ||
            error.status === 503
          ) {
            console.log(`⏭️ Trying next Gemini model...`)
            continue
          }

          // 其他错误，尝试下一个模型
          continue
        }
      }
    }

    // 所有 API 都失败了
    throw lastError || new Error('All AI providers failed')

  } catch (error: any) {
    console.error('Generate script error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate script' },
      { status: 500 }
    )
  }
}

function buildScriptPrompt(
  words: Array<{ word: string; definition?: string }>,
  genre: 'romance' | 'workplace' | 'slice_of_life',
  userSettings: any
) {
  const genreDescriptions = {
    romance: 'Romance/CEO drama style - heart-pounding, sweet interactions, confession moments',
    workplace: 'Workplace comedy - embarrassing situations, social disasters, funny daily life',
    slice_of_life: 'Slice of life/healing - beautiful moments, unexpected joy, warm encounters',
  }

  const englishLevel = userSettings?.english_level || 'B1'
  const definitionPref = userSettings?.definition_preference || 'native_language'

  const wordList = words.map(w => `- ${w.word}${w.definition ? ` (${w.definition})` : ''}`).join('\n')

  // 根据单词数量调整故事长度
  const storyLength = words.length <= 3 ? '8-10' : words.length <= 5 ? '10-12' : '12-15'

  return `You are a creative scriptwriter for an English learning app. Create a short, engaging chat-style drama script.

**Target vocabulary words (MUST include all ${words.length} words):**
${wordList}

**Genre:** ${genre} - ${genreDescriptions[genre]}

**User English Level:** ${englishLevel} (CEFR standard)
- Use vocabulary and grammar appropriate for this level
- Main dialogue should be simple enough for ${englishLevel} learners
- Only the target vocabulary words should be challenging

**Script Requirements:**
1. **Length:** ${storyLength} chat messages (adjusted for ${words.length} vocabulary words)
2. **Structure:**
   - Opening: Immediate hook (1-2 messages)
   - Conflict: Quick tension build-up (2-3 messages)
   - Climax: Use vocabulary words naturally (3-4 messages)
   - Twist ending: Unexpected happy conclusion (1-2 messages)

3. **Vocabulary Integration:**
   - Each target word must appear naturally in context
   - **CRITICAL**: ONLY highlight the exact target words from the vocabulary list above
   - DO NOT highlight common words like "my", "the", "and", "is", etc.
   - Highlight words with appropriate styles:
     * "glow": Key vocabulary, important moments
     * "shake": Emotional emphasis
     * "redline": Mistakes or warnings
     * "blur": Mystery or surprise

4. **Chat Format:**
   - Mix of dialogue bubbles and narration
   - Speakers: Character names, "You", "Narration", "Your thoughts", "System"
   - Keep it conversational and modern
   - Use emojis sparingly for emphasis

5. **Definitions:**
   - Provide TWO definitions for each highlighted word:
     * definition_simple_english: Simple English explanation (for ${englishLevel} learner)
     * definition_native: Chinese translation

**Output Format (JSON):**
\`\`\`json
{
  "messages": [
    {
      "id": "1",
      "speaker": "Narration",
      "is_user": false,
      "content": "Scene description...",
      "emotion": "neutral",
      "highlighted_words": []
    },
    {
      "id": "2",
      "speaker": "Character Name",
      "is_user": false,
      "content": "Dialogue with the word example in it.",
      "emotion": "excited",
      "highlighted_words": [
        {
          "word": "example",
          "vocabulary_id": "example-1",
          "style": "glow",
          "definition_simple_english": "a thing used to show what others are like",
          "definition_native": "例子；范例"
        }
      ]
    }
  ]
}
\`\`\`

**CRITICAL RULES:**
1. The "content" field must be PLAIN TEXT ONLY - NO HTML tags, NO special formatting
2. Do NOT write <span>, <div>, or any HTML in the content field
3. The word should appear naturally in the content as plain text
4. The highlighting will be added automatically by the app based on "highlighted_words" array
5. Example:
   - ✅ CORRECT: "content": "This is an example sentence."
   - ❌ WRONG: "content": "This is an <span class='glow'>example</span> sentence."

**Important:**
- ALL messages must be in ENGLISH (dialogue, narration, everything)
- Only definitions can be in Chinese
- Make it engaging like a TikTok short drama (quick hook, conflict, twist)
- Ensure vocabulary words appear in dramatic/memorable moments
- Keep it appropriate for language learners (clear context clues)
- **CRITICAL**: Maintain proper spacing and punctuation in all content
- **CRITICAL**: Only use "highlighted_words" for the target vocabulary from the list above
- Do NOT create highlighted_words entries for common words (my, the, and, is, etc.)

Generate the script now as valid JSON only (no markdown, no explanation).`
}
