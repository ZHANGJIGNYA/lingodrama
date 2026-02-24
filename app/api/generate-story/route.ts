import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
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

### 8. MESSAGE LENGTH (CRITICAL):
- Each message should be 1-3 SHORT sentences maximum
- Like real text messages or chat bubbles
- NO long paragraphs or monologues
- Break long thoughts into multiple messages
- EACH CHARACTER SPEAKS IN SEPARATE MESSAGES
- Example GOOD:
  Message 1 - Mrs. Wang: "What? You're firing me?"
  Message 2 - Xiaoya: "Yes. Pack your things."
- Example BAD:
  Message 1 - Narrator: "Mrs. Wang said 'What? You're firing me?' and Xiaoya replied 'Yes. Pack your things.'"
- NEVER use narrator to describe dialogue
- ALWAYS use character names as sender

## OUTPUT FORMAT (JSON only):
{
  "title": "Dramatic episode title",
  "hook": "One shocking sentence hook",
  "messages": [
    {
      "sender": "Character name or 'Narrator'",
      "avatar": "😱" (emoji matching emotion),
      "text": "Short dialogue with *target_word* marked (1-3 sentences max)",
      "vocabs": [{"word": "target_word", "type": "highlight"}],
      "isImage": false
    }
  ]
}

## CRITICAL RULES:
- Output ONLY valid JSON, no markdown code blocks
- Exactly 8-10 messages
- EACH MESSAGE MUST BE SHORT (1-3 sentences, like real chat)
- NEVER use "Narrator" as sender - ONLY use character names
- NEVER describe what characters said - ONLY direct dialogue
- Every message must advance the plot
- Make it ADDICTIVE and satisfying
- Use Chinese drama tropes: hidden identity, face-slapping, revenge
- Keep dialogue punchy and emotional

## COMPLETE EXAMPLE 1 (Hidden Identity Reveal):
{
  "title": "The Billionaire Janitor",
  "hook": "She threw money at him, not knowing he owned the building",
  "messages": [
    {"sender": "Mrs. Chen", "avatar": "😤", "text": "Take this money and get out! You're just a *poor* janitor!", "vocabs": [{"word": "poor", "type": "highlight"}], "isImage": false},
    {"sender": "Xiaoming", "avatar": "😐", "text": "I don't need your money.", "vocabs": [], "isImage": false},
    {"sender": "Mrs. Chen", "avatar": "😠", "text": "How *dare* you refuse me? Do you know who I am?", "vocabs": [{"word": "dare", "type": "highlight"}], "isImage": false},
    {"sender": "Xiaoming", "avatar": "😏", "text": "I'm the owner of this building. You have 24 hours to move out.", "vocabs": [], "isImage": false},
    {"sender": "Mrs. Chen", "avatar": "😱", "text": "What? That's impossible!", "vocabs": [], "isImage": false},
    {"sender": "Xiaoming", "avatar": "😎", "text": "Check the property records. I'm very *confident* you'll find my name.", "vocabs": [{"word": "confident", "type": "highlight"}], "isImage": false},
    {"sender": "Mrs. Chen", "avatar": "😰", "text": "Please, I was wrong! Give me another chance!", "vocabs": [], "isImage": false},
    {"sender": "Xiaoming", "avatar": "🚪", "text": "You should *apologize* to all the workers you insulted. Then we'll talk.", "vocabs": [{"word": "apologize", "type": "highlight"}], "isImage": false}
  ]
}

## COMPLETE EXAMPLE 2 (Revenge Drama):
{
  "title": "The Ex-Wife's Return",
  "hook": "He divorced her for being useless, now she's his boss",
  "messages": [
    {"sender": "Zhang Wei", "avatar": "😤", "text": "Sign these divorce papers! You're *useless* to me!", "vocabs": [{"word": "useless", "type": "highlight"}], "isImage": false},
    {"sender": "Lili", "avatar": "😢", "text": "Fine. I'll sign.", "vocabs": [], "isImage": false},
    {"sender": "Zhang Wei", "avatar": "😏", "text": "Good. Now get out of my house.", "vocabs": [], "isImage": false},
    {"sender": "Lili", "avatar": "😐", "text": "Actually, this is my house. I bought it last year.", "vocabs": [], "isImage": false},
    {"sender": "Zhang Wei", "avatar": "😨", "text": "What? How did you get so much money?", "vocabs": [], "isImage": false},
    {"sender": "Lili", "avatar": "😎", "text": "I'm the CEO of Chen Corporation. Your company's biggest client.", "vocabs": [], "isImage": false},
    {"sender": "Zhang Wei", "avatar": "😰", "text": "Lili, I was wrong! Can we talk about this?", "vocabs": [], "isImage": false},
    {"sender": "Lili", "avatar": "💼", "text": "I'm *busy* with important meetings. Security will show you out.", "vocabs": [{"word": "busy", "type": "highlight"}], "isImage": false},
    {"sender": "Zhang Wei", "avatar": "😭", "text": "Please! I'll do anything!", "vocabs": [], "isImage": false},
    {"sender": "Lili", "avatar": "👋", "text": "You had your chance. Goodbye, Zhang Wei.", "vocabs": [], "isImage": false}
  ]
}

NOW GENERATE A NEW DRAMA FOLLOWING THIS EXACT FORMAT. Remember:
- ONLY character names as sender (Mrs. Wang, Xiaoya, Chen Hao, etc.)
- NEVER use "Narrator"
- Direct dialogue only, no descriptions
- 1-3 short sentences per message
- Mark vocabulary words with asterisks in the text

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
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
    console.error('Error details:', JSON.stringify(error, null, 2))

    // Return more detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        error: 'Failed to generate story',
        details: errorMessage,
        baseURL: process.env.ANTHROPIC_BASE_URL || 'not set'
      },
      { status: 500 }
    )
  }
}
