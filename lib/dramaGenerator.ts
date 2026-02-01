import type { DramaMessage, Vocabulary, ReviewType } from './types'

// Template for generating drama messages that incorporate user's vocabulary
interface MessageTemplate {
  sender: string
  avatar: string
  template: string // Use {word} as placeholder for vocab
  vocabType: ReviewType
}

// Romance drama templates - each story beat uses the user's vocabulary
const romanceTemplates: MessageTemplate[][] = [
  // Opening - establish situation
  [
    { sender: 'You', avatar: '😊', template: "Just finished my meeting. Finally heading home!", vocabType: 'natural' },
    { sender: 'Unknown', avatar: '❓', template: "Hi, you don't know me, but I think you should know something.", vocabType: 'natural' },
    { sender: 'You', avatar: '😕', template: "Who is this?", vocabType: 'natural' },
  ],
  // First vocab introduction
  [
    { sender: 'Unknown', avatar: '❓', template: "That doesn't matter. There's something *{word}* going on with your husband.", vocabType: 'highlight' },
    { sender: 'You', avatar: '😰', template: "What do you mean? What's {word}?", vocabType: 'context' },
  ],
  // Second vocab
  [
    { sender: 'Unknown', avatar: '❓', template: "I have *{word}*. Proof that he's been lying to you.", vocabType: 'highlight' },
    { sender: 'You', avatar: '😱', template: "No... this can't be real...", vocabType: 'natural' },
  ],
  // Third vocab - partial mask
  [
    { sender: 'Unknown', avatar: '❓', template: "I have more {word}___. This isn't the first time.", vocabType: 'partial_mask' },
    { sender: 'You', avatar: '😭', template: "Who are you? How do you know this?", vocabType: 'natural' },
  ],
  // Fourth vocab
  [
    { sender: 'Unknown', avatar: '❓', template: "I'm someone who knows about *{word}*. I've seen what he's planning.", vocabType: 'highlight' },
    { sender: 'You', avatar: '😢', template: "Planning what?", vocabType: 'natural' },
  ],
  // Fifth vocab - blank fill
  [
    { sender: 'Unknown', avatar: '❓', template: "The situation is more [?] than you think. He's hiding money.", vocabType: 'blank_fill' },
    { sender: 'You', avatar: '😨', template: "Money? What money?", vocabType: 'natural' },
  ],
  // Closing - cliffhanger
  [
    { sender: 'Unknown', avatar: '❓', template: "Meet me tomorrow. 3 PM. The cafe across from your office. I'll explain everything.", vocabType: 'natural' },
    { sender: 'You', avatar: '😤', template: "Fine. But you better have answers.", vocabType: 'natural' },
  ],
]

/**
 * Generate drama messages using user's vocabulary
 * @param words User's vocabulary words to incorporate into the story
 * @returns Array of DramaMessage for the episode
 */
export function generateDramaMessages(words: Vocabulary[]): DramaMessage[] {
  const messages: DramaMessage[] = []
  let messageId = 1
  let wordIndex = 0

  for (const templateGroup of romanceTemplates) {
    for (const template of templateGroup) {
      const currentWord = words[wordIndex % words.length]
      let text = template.template
      const vocabs: { word: string; type: ReviewType }[] = []

      // Check if this template uses a vocab word
      if (text.includes('{word}') && currentWord) {
        const wordText = currentWord.word.toLowerCase()

        // Format based on vocab type
        switch (template.vocabType) {
          case 'highlight':
            text = text.replace('{word}', wordText)
            vocabs.push({ word: wordText, type: 'highlight' })
            wordIndex++
            break
          case 'partial_mask':
            // Show first few letters, then mask
            const visibleLen = Math.min(3, Math.floor(wordText.length / 2))
            text = text.replace('{word}___', wordText.slice(0, visibleLen) + '___')
            vocabs.push({ word: wordText, type: 'partial_mask' })
            wordIndex++
            break
          case 'blank_fill':
            text = text.replace('[?]', `[${wordText}]`)
            vocabs.push({ word: wordText, type: 'blank_fill' })
            wordIndex++
            break
          case 'context':
            text = text.replace('{word}', wordText)
            vocabs.push({ word: wordText, type: 'context' })
            break
          default:
            text = text.replace('{word}', wordText)
            break
        }
      }

      messages.push({
        id: `gen-msg-${messageId++}`,
        sender: template.sender,
        avatar: template.avatar,
        text,
        vocabs,
        isImage: false,
      })
    }
  }

  return messages
}

/**
 * Create a complete episode from user vocabulary
 * @param words Words to use in the episode
 * @param episodeNumber Which episode (1, 2, 3...)
 * @returns Episode data with generated messages
 */
export function createEpisodeFromWords(
  words: Vocabulary[],
  episodeNumber: number = 1
): {
  title: string
  hook: string
  duration: string
  messages: DramaMessage[]
  vocabIds: string[]
} {
  const titles = [
    { title: 'The Discovery', hook: 'A stranger reveals a dark secret...' },
    { title: 'The Truth', hook: "Everything you believed was a lie..." },
    { title: 'The Confrontation', hook: "It's time to face the truth..." },
  ]

  const episodeInfo = titles[(episodeNumber - 1) % titles.length]
  const messages = generateDramaMessages(words)

  return {
    title: episodeInfo.title,
    hook: episodeInfo.hook,
    duration: `${Math.max(5, words.length * 2)} min`,
    messages,
    vocabIds: words.map((w) => w.id),
  }
}
