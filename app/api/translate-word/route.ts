import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  baseURL: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
})

export async function POST(request: NextRequest) {
  try {
    const { word } = await request.json()

    if (!word) {
      return NextResponse.json({ error: 'No word provided' }, { status: 400 })
    }

    const prompt = `Provide a simple, clear definition for the English word "${word}".

Output ONLY a JSON object with this format:
{
  "definition": "Simple English definition (one sentence)",
  "part_of_speech": "noun/verb/adjective/adverb/etc"
}

Example for "confident":
{
  "definition": "Feeling sure about your abilities or qualities",
  "part_of_speech": "adjective"
}

Now provide the definition for: ${word}`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 200,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''

    // Parse JSON response
    let data
    try {
      const cleanText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      data = JSON.parse(cleanText)
    } catch (parseError) {
      console.error('Failed to parse translation response:', responseText)
      return NextResponse.json({
        definition: `A word in English: ${word}`,
        part_of_speech: 'unknown'
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error translating word:', error)
    return NextResponse.json(
      { error: 'Failed to translate word' },
      { status: 500 }
    )
  }
}
