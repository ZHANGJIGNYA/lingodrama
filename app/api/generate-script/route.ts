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
    romance: 'Romance/CEO drama - heart-pounding, sweet interactions, confession moments, high-stakes romance',
    workplace: 'Workplace drama - career decisions, office politics, professional dilemmas',
    slice_of_life: 'Slice of life - daily choices, personal relationships, meaningful moments',
  }

  const playerRoles = {
    romance: 'the romantic lead (CEO\'s love interest, new employee, etc.)',
    workplace: 'a professional (manager, team lead, consultant, etc.)',
    slice_of_life: 'yourself in a daily situation',
  }

  const englishLevel = userSettings?.english_level || 'B1'
  const nativeLanguage = userSettings?.native_language || 'zh-CN'
  const nativeLanguageNames: Record<string, string> = {
    'zh-CN': 'Simplified Chinese',
    'zh-TW': 'Traditional Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
  }

  const wordList = words.map(w => `- ${w.word}${w.definition ? ` (${w.definition})` : ''}`).join('\n')

  return `You are the "Game Master" for an interactive thriller/romance English learning app.
Your goal is to test the user's understanding of vocabulary words by embedding them into high-stakes "Plot Choices".

# Task
Create **${words.length} interactive scenarios** (one for each word below).
Each scenario must be a **multiple-choice challenge** where the user must understand the target word to make the correct decision.

# Input Data
**Target Words (MUST create one scenario for each):**
${wordList}

**Genre:** ${genre} - ${genreDescriptions[genre]}
**Player Role:** ${playerRoles[genre]}
**User English Level:** ${englishLevel} (CEFR standard)
**User's Native Language:** ${nativeLanguageNames[nativeLanguage]}

# Critical Rules

## 1. Language & Difficulty (CRITICAL)
- Write the "context" field in **English ONLY**
- Adjust sentence complexity to match ${englishLevel} proficiency
- **Smart Aid System**: If a word in the context is significantly harder than ${englishLevel} (but NOT the target word), add it to "context_aids" with explanation
- **DO NOT** provide translation for the target word - user must infer from context

## 2. Choice Logic
- Provide 2-3 plausible options
- Options must look like reasonable plot actions
- Only ONE option demonstrates correct understanding of the target word
- Wrong choices lead to failure/danger/drama
- Make it a genuine test - can't just guess

## 3. Feedback (CRITICAL)
- **success_feedback**: Explain WHY this choice was correct (in ${nativeLanguageNames[nativeLanguage]})
- **failure_feedback**: Explain the correct meaning and why the chosen action was wrong (in ${nativeLanguageNames[nativeLanguage]})
- Be encouraging but educational

# Output Format (JSON)

\`\`\`json
{
  "scenarios": [
    {
      "id": "1",
      "vocabulary_id": "word-id-1",
      "target_word": "ambiguous",
      "player_role": "detective",
      "context": "The suspect's alibi is ambiguous. You have two hours before the press conference. What do you do?",
      "context_aids": [
        {
          "word": "alibi",
          "explanation": "不在场证明 (proof of being elsewhere)"
        }
      ],
      "choices": [
        {
          "id": "1a",
          "text": "Immediately arrest the suspect",
          "is_correct": false
        },
        {
          "id": "1b",
          "text": "Investigate further to clarify the unclear details",
          "is_correct": true
        },
        {
          "id": "1c",
          "text": "Trust the alibi and close the case",
          "is_correct": false
        }
      ],
      "correct_choice_id": "1b",
      "success_feedback": "正确！ambiguous 意思是'模棱两可的、不明确的'。你选择进一步调查来澄清不清楚的细节，这说明你理解了这个词的含义。",
      "failure_feedback": "ambiguous 的意思是'模棱两可的、不明确的'。当证据不明确时，应该调查清楚，而不是贸然行动或轻信。"
    }
  ]
}
\`\`\`

# Important Notes
- Each scenario must be self-contained and exciting
- Create dramatic tension around the word's meaning
- Make success feel rewarding and failure educational
- Ensure choices genuinely test word understanding, not general knowledge
- Keep context concise (2-3 sentences max)
- Use ${englishLevel}-appropriate vocabulary EXCEPT for target words

Generate the interactive scenarios now as valid JSON only (no markdown, no explanation).`
}
