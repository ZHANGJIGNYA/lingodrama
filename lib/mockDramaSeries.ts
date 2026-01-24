import type { DramaSeries, DramaMessage } from './types'

// Episode 1: "The Discovery" - Romance Drama 完整剧本
const episode1Messages: DramaMessage[] = [
  {
    id: 'msg-1',
    sender: 'You',
    avatar: '😊',
    text: "Just finished my meeting. Finally heading home!",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-2',
    sender: 'Unknown',
    avatar: '❓',
    text: "Hi, you don't know me, but I think you should know something.",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-3',
    sender: 'You',
    avatar: '😕',
    text: "Who is this?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-4',
    sender: 'Unknown',
    avatar: '❓',
    text: "That doesn't matter. What matters is your husband. There's something *suspicious* going on.",
    vocabs: [{ word: 'suspicious', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-5',
    sender: 'You',
    avatar: '😰',
    text: "What do you mean? What's suspicious?",
    vocabs: [{ word: 'suspicious', type: 'context' }],
    isImage: false
  },
  {
    id: 'msg-6',
    sender: 'Unknown',
    avatar: '❓',
    text: "I have *evidence*. Check the photo I'm about to send.",
    vocabs: [{ word: 'evidence', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-7',
    sender: 'Unknown',
    avatar: '📸',
    text: "[Photo of your husband with another woman at a hotel entrance, holding hands]",
    vocabs: [],
    isImage: true,
    imageDesc: "A photo showing your husband with a younger woman, both smiling, at the entrance of a luxury hotel"
  },
  {
    id: 'msg-8',
    sender: 'You',
    avatar: '😱',
    text: "No... this can't be real...",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-9',
    sender: 'Unknown',
    avatar: '❓',
    text: "I have more evid___. This isn't the first time.",
    vocabs: [{ word: 'evidence', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-10',
    sender: 'You',
    avatar: '😭',
    text: "Who are you? How do you know this?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-11',
    sender: 'Unknown',
    avatar: '❓',
    text: "I'm someone who's been through *betrayal* too. I know how it feels.",
    vocabs: [{ word: 'betrayal', type: 'highlight' }],
    isImage: false
  },
  {
    id: 'msg-12',
    sender: 'You',
    avatar: '😢',
    text: "This is... I trusted him. How could he do this?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-13',
    sender: 'Unknown',
    avatar: '❓',
    text: "The sus_____ part is that she works at your company. You've probably seen her.",
    vocabs: [{ word: 'suspicious', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-14',
    sender: 'You',
    avatar: '😨',
    text: "At my company? Who is she?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-15',
    sender: 'Unknown',
    avatar: '❓',
    text: "Her name is Emma. From the marketing department. Do you have more [?] you need?",
    vocabs: [{ word: 'evidence', type: 'blank_fill' }],
    isImage: false
  },
  {
    id: 'msg-16',
    sender: 'You',
    avatar: '😡',
    text: "Emma... I know her. She's younger... prettier...",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-17',
    sender: 'Unknown',
    avatar: '❓',
    text: "The betr___ goes deeper. They've been planning something.",
    vocabs: [{ word: 'betrayal', type: 'partial_mask' }],
    isImage: false
  },
  {
    id: 'msg-18',
    sender: 'You',
    avatar: '💔',
    text: "Planning what?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-19',
    sender: 'Unknown',
    avatar: '❓',
    text: "I'll tell you more when we meet. But you need to know - this isn't just about betrayal. There's money involved too.",
    vocabs: [{ word: 'betrayal', type: 'natural' }],
    isImage: false
  },
  {
    id: 'msg-20',
    sender: 'You',
    avatar: '😤',
    text: "Meet? When?",
    vocabs: [],
    isImage: false
  },
  {
    id: 'msg-21',
    sender: 'Unknown',
    avatar: '❓',
    text: "Tomorrow. 3 PM. The cafe across from your office. Don't tell anyone. This suspicious situation requires careful handling.",
    vocabs: [{ word: 'suspicious', type: 'natural' }],
    isImage: false
  }
]

// Mock Drama Series Data
export const mockDramaSeries: Record<string, DramaSeries> = {
  female: {
    id: 'female',
    title: 'The Perfect Marriage',
    subtitle: 'A story of love, lies, and revenge',
    totalEpisodes: 3,
    genre: 'Romance Drama',
    emoji: '💔',
    gradient: 'from-rose-900 via-pink-900 to-red-900',
    episodes: [
      {
        id: 1,
        title: 'The Discovery',
        hook: 'I saw my husband with HER at the hotel...',
        duration: '8 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [], // Will be filled dynamically
        messages: episode1Messages
      },
      {
        id: 2,
        title: 'The Other Woman',
        hook: "She's younger, prettier, and knows everything about me",
        duration: '10 min',
        unlocked: false,
        cliffhanger: 'She wants to meet me tomorrow...',
        masteryRequired: 60,
        vocabIds: [],
        messages: [] // Will be generated
      },
      {
        id: 3,
        title: 'Revenge Plan',
        hook: "They think I'll just walk away quietly. They're wrong.",
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: [] // Will be generated
      }
    ]
  },
  male: {
    id: 'male',
    title: 'The Corporate Game',
    subtitle: 'Power, betrayal, and the price of ambition',
    totalEpisodes: 3,
    genre: 'Corporate Thriller',
    emoji: '💼',
    gradient: 'from-blue-900 via-indigo-900 to-purple-900',
    episodes: [
      {
        id: 1,
        title: 'The Offer',
        hook: 'My boss just offered me a deal I can\'t refuse... or can I?',
        duration: '8 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: [] // Will be generated
      },
      {
        id: 2,
        title: 'The Trap',
        hook: 'That deal was too good to be true. Now I\'m in deep.',
        duration: '10 min',
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: [] // Will be generated
      },
      {
        id: 3,
        title: 'The Escape',
        hook: 'I know their secrets. Time to use them.',
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: [] // Will be generated
      }
    ]
  },
  neutral: {
    id: 'neutral',
    title: 'The Missing File',
    subtitle: 'Everyone in the office is a suspect',
    totalEpisodes: 3,
    genre: 'Mystery',
    emoji: '🔍',
    gradient: 'from-gray-900 via-slate-800 to-zinc-900',
    episodes: [
      {
        id: 1,
        title: 'The Crime Scene',
        hook: 'They found the body in the office. Everyone\'s a suspect.',
        duration: '8 min',
        unlocked: true,
        masteryRequired: 0,
        vocabIds: [],
        messages: [] // Will be generated
      },
      {
        id: 2,
        title: 'The Interrogation',
        hook: 'Everyone has secrets. Someone is lying.',
        duration: '10 min',
        unlocked: false,
        masteryRequired: 60,
        vocabIds: [],
        messages: [] // Will be generated
      },
      {
        id: 3,
        title: 'The Truth',
        hook: 'The killer was closer than I thought.',
        duration: '12 min',
        unlocked: false,
        masteryRequired: 80,
        vocabIds: [],
        messages: [] // Will be generated
      }
    ]
  }
}

// Helper function to get a series with updated vocab IDs
export function getDramaSeriesWithVocabs(
  seriesType: 'female' | 'male' | 'neutral',
  vocabIds: string[]
): DramaSeries {
  const series = JSON.parse(JSON.stringify(mockDramaSeries[seriesType])) as DramaSeries

  // Distribute vocabs across episodes
  const vocabsPerEpisode = Math.ceil(vocabIds.length / series.episodes.length)

  series.episodes.forEach((episode, index) => {
    const startIdx = index * vocabsPerEpisode
    const endIdx = Math.min(startIdx + vocabsPerEpisode, vocabIds.length)
    episode.vocabIds = vocabIds.slice(startIdx, endIdx)
  })

  return series
}
