import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com',
})

interface VocabWord {
  word: string
  definition: string
}

interface GeneratedMessage {
  id: string
  sender: string
  avatar: string
  text: string
  vocabs: Array<{ word: string; type: 'highlight' | 'partial_mask' | 'blank_fill' | 'context' | 'natural' }>
  isImage: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { words, genre, language, userLevel = 'B1', definitionPreference = 'simple_english', perspective = 'unspecified' } = await request.json()

    if (!words || words.length === 0) {
      return NextResponse.json({ error: 'No words provided' }, { status: 400 })
    }

    const wordList = words.map((w: VocabWord) => `${w.word}`).join(', ')

    // Determine if we should provide Chinese definitions
    const shouldProvideChinese = definitionPreference === 'native_language' && language === 'zh'

    const prompt = `You are a specialist in writing addictive Chinese-style short dramas (短剧). Generate a chat-style drama that naturally incorporates these vocabulary words: ${wordList}

## USER PREFERENCES:
- English Level: ${userLevel} (CEFR)
- Perspective: ${perspective === 'male' ? 'Male protagonist' : perspective === 'female' ? 'Female protagonist' : 'Neutral/flexible'}
- Definition Language: ${shouldProvideChinese ? 'Provide Chinese translations in vocab array' : 'English only'}

## CORE REQUIREMENTS:

### 1. EXPLOSIVE OPENING (First 2 messages)
- Start with IMMEDIATE conflict or shocking revelation
- Examples:
  * Someone throwing water/money at protagonist
  * Discovering betrayal/secret identity
  * Public humiliation scene
- NO greetings, small talk, or setup

### 2. FAST REVERSAL (Message 3-4)
- Protagonist reveals hidden identity/power
- Antagonist's face turns pale with shock
- Classic tropes:
  * "Poor" person is actually a billionaire
  * "Janitor" is the company owner
  * "Ex-wife" now controls everything

### 3. SATISFYING CLIMAX (Message 5-8)
- Antagonist begs for mercy
- Protagonist coldly refuses or sets conditions
- End with a power statement

### 4. STRUCTURE (8-10 messages total):
- Messages 1-2: Conflict/humiliation
- Messages 3-4: Identity reveal/reversal
- Messages 5-8: Begging/rejection/power move
- Optional 9-10: Cliffhanger for next episode

### 5. CHARACTER NAMES:
- Use Chinese pinyin names: Mrs. Wang, Xiaoya, Chen Hao, Lili, etc.
- Keeps the authentic Chinese drama feel

### 6. VOCABULARY INTEGRATION:
- Each target word must appear naturally in dialogue
- Words should fit the emotional moment
- Mark target words with asterisks: *confident*, *deserve*, *apologize*

### 7. LANGUAGE LEVEL:
- User's English level: ${userLevel}
- Keep non-target vocabulary at or below ${userLevel} level
- Use simple, conversational English
- Avoid complex grammar or rare words

## OUTPUT FORMAT (JSON only):
{
  "title": "Dramatic episode title",
  "hook": "One shocking sentence hook",
  "messages": [
    {
      "sender": "Character name or 'Narrator'",
      "avatar": "😱" (emoji matching emotion),
      "text": "Dialogue with *target_word* marked",
      "vocabs": [{"word": "target_word", "type": "highlight"}],
      "isImage": false
    }
  ]
}

## CRITICAL RULES:
- Output ONLY valid JSON, no markdown code blocks
- Exactly 8-10 messages
- Every message must advance the plot
- Make it ADDICTIVE and satisfying
- Use Chinese drama tropes: hidden identity, face-slapping, revenge
- Keep dialogue punchy and emotional`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      temperature: 0.8,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse the JSON response
    let storyData
    try {
      // Remove markdown code blocks if present
      const cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      storyData = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText)
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
    }

    // Add IDs to messages
    const messagesWithIds: GeneratedMessage[] = storyData.messages.map((msg: GeneratedMessage, index: number) => ({
      ...msg,
      id: `ai-msg-${index + 1}`,
      isImage: msg.isImage || false,
    }))

    return NextResponse.json({
      title: storyData.title,
      hook: storyData.hook,
      messages: messagesWithIds,
    })
  } catch (error) {
    console.error('Error generating story:', error)
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    )
  }
}
