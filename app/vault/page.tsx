'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, ChevronDown, X, Volume2, Star, Clock, TrendingUp, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

// Mock 数据
const mockArchives: Array<{
  id: number
  word: string
  pos: string
  posShort: string
  phonetic: string
  definition: string
  fullDefinition: string
  level: string
  source: string
  episode: string
  scene: string
  examples: string[]
  synonyms: string[]
  antonyms: string[]
  timesReviewed: number
  lastReviewed: string
  mastery: number
}> = [
  {
    id: 1,
    word: 'Treacherous',
    pos: 'Adjective',
    posShort: 'Adj',
    phonetic: '/ˈtretʃərəs/',
    definition: 'Guilty of betrayal or deception',
    fullDefinition: 'Guilty of or involving betrayal or deception; hazardous because of presenting hidden or unpredictable dangers.',
    level: 'B2',
    source: "The CEO's Secret",
    episode: 'Ep. 3 - The Betrayal',
    scene: '/images/scene-betrayal.jpg',
    examples: [
      'The treacherous road conditions made driving dangerous.',
      'She discovered his treacherous plot against the company.',
    ],
    synonyms: ['disloyal', 'unfaithful', 'deceitful', 'perfidious'],
    antonyms: ['loyal', 'faithful', 'trustworthy'],
    timesReviewed: 5,
    lastReviewed: '2 days ago',
    mastery: 75,
  },
  {
    id: 2,
    word: 'Ruthless',
    pos: 'Adjective',
    posShort: 'Adj',
    phonetic: '/ˈruːθləs/',
    definition: 'Having no pity or compassion',
    fullDefinition: 'Having or showing no pity or compassion for others; cruel and determined to succeed.',
    level: 'B2',
    source: "The CEO's Secret",
    episode: 'Ep. 1 - The Takeover',
    scene: '/images/scene-power.jpg',
    examples: [
      'He was ruthless in his pursuit of power.',
      'The ruthless CEO fired half the staff.',
    ],
    synonyms: ['merciless', 'cruel', 'heartless', 'brutal'],
    antonyms: ['merciful', 'compassionate', 'kind'],
    timesReviewed: 8,
    lastReviewed: '1 day ago',
    mastery: 90,
  },
  {
    id: 3,
    word: 'Inevitable',
    pos: 'Adjective',
    posShort: 'Adj',
    phonetic: '/ɪnˈevɪtəbl/',
    definition: 'Certain to happen; unavoidable',
    fullDefinition: 'Certain to happen; unavoidable. So frequently experienced or seen that it is completely predictable.',
    level: 'B1',
    source: "The CEO's Secret",
    episode: 'Ep. 5 - The Confrontation',
    scene: '/images/scene-confrontation.jpg',
    examples: [
      'Their confrontation was inevitable.',
      'Change is inevitable in any growing company.',
    ],
    synonyms: ['unavoidable', 'inescapable', 'certain', 'sure'],
    antonyms: ['avoidable', 'uncertain', 'preventable'],
    timesReviewed: 3,
    lastReviewed: '5 days ago',
    mastery: 60,
  },
  {
    id: 4,
    word: 'Leverage',
    pos: 'Noun',
    posShort: 'N',
    phonetic: '/ˈlevərɪdʒ/',
    definition: 'Power to influence or act',
    fullDefinition: 'The power to influence a person or situation to achieve a particular outcome; advantage gained from a position of strength.',
    level: 'C1',
    source: "The CEO's Secret",
    episode: 'Ep. 2 - Power Play',
    scene: '/images/scene-power.jpg',
    examples: [
      'She used her connections as leverage in the negotiation.',
      'Having inside information gave him leverage.',
    ],
    synonyms: ['influence', 'power', 'advantage', 'clout'],
    antonyms: ['weakness', 'disadvantage'],
    timesReviewed: 2,
    lastReviewed: '1 week ago',
    mastery: 45,
  },
  {
    id: 5,
    word: 'Clandestine',
    pos: 'Adjective',
    posShort: 'Adj',
    phonetic: '/klænˈdestɪn/',
    definition: 'Kept secret or hidden',
    fullDefinition: 'Kept secret or done secretively, especially because illicit or improper.',
    level: 'C1',
    source: "The CEO's Secret",
    episode: 'Ep. 4 - Hidden Agenda',
    scene: '/images/scene-betrayal.jpg',
    examples: [
      'They held clandestine meetings after midnight.',
      'The clandestine affair was finally exposed.',
    ],
    synonyms: ['secret', 'covert', 'furtive', 'surreptitious'],
    antonyms: ['open', 'public', 'overt'],
    timesReviewed: 1,
    lastReviewed: 'Today',
    mastery: 30,
  },
]

// CEFR Distribution data
const cefrData = [
  { level: 'A1', count: 12, color: '#22c55e' },
  { level: 'A2', count: 18, color: '#84cc16' },
  { level: 'B1', count: 24, color: '#eab308' },
  { level: 'B2', count: 15, color: '#f97316' },
  { level: 'C1', count: 8, color: '#ef4444' },
  { level: 'C2', count: 3, color: '#dc2626' },
]

// Source Breakdown data
const sourceData = [
  { source: "The CEO's Secret", count: 28, color: '#E50914' },
  { source: 'Revenge of Love', count: 19, color: '#9D00FF' },
  { source: 'Manual Input', count: 15, color: '#FFD700' },
  { source: 'Dark Romance', count: 12, color: '#06b6d4' },
  { source: 'Other', count: 6, color: '#737373' },
]

// Collapsible Section Component
function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// CEFR Bar Chart Component
function CEFRChart() {
  const maxCount = Math.max(...cefrData.map((d) => d.count))
  const total = cefrData.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="space-y-3">
      {cefrData.map((item) => (
        <div key={item.level} className="flex items-center gap-3">
          <span className="w-8 text-xs font-bold text-foreground">
            {item.level}
          </span>
          <div className="flex-1 h-6 bg-secondary rounded-md overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.count / maxCount) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="h-full rounded-md flex items-center justify-end pr-2"
              style={{ backgroundColor: item.color }}
            >
              <span className="text-[10px] font-bold text-white">
                {item.count}
              </span>
            </motion.div>
          </div>
          <span className="w-10 text-right text-xs text-muted-foreground">
            {Math.round((item.count / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  )
}

// Source Breakdown Component
function SourceBreakdown() {
  const total = sourceData.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="space-y-3">
      {sourceData.map((item) => (
        <div key={item.source} className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="flex-1 text-sm text-foreground truncate">
            {item.source}
          </span>
          <span className="text-sm font-medium text-foreground">
            {item.count}
          </span>
          <span className="w-10 text-right text-xs text-muted-foreground">
            {Math.round((item.count / total) * 100)}%
          </span>
        </div>
      ))}
    </div>
  )
}

// Word Detail Modal
function WordDetailModal({
  word,
  onClose,
}: {
  word: (typeof mockArchives)[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[85vh] bg-card rounded-t-3xl overflow-hidden"
      >
        {/* Header with Image */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={word.scene || '/placeholder.svg'}
            alt={word.episode}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-electric-purple/20 text-electric-purple text-[10px] font-bold uppercase rounded">
                {word.level}
              </span>
              <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-[10px] font-medium rounded">
                {word.pos}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[calc(85vh-8rem)]">
          {/* Word and Phonetic */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {word.word}
              </h2>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{word.phonetic}</p>
          </div>

          {/* Definition */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Definition
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {word.fullDefinition}
            </p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Examples
            </h3>
            <div className="space-y-2">
              {word.examples.map((example, i) => (
                <div
                  key={i}
                  className="p-3 bg-secondary/50 rounded-lg border-l-2 border-electric-purple"
                >
                  <p className="text-sm text-foreground italic">
                    {'"'}
                    {example}
                    {'"'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms & Antonyms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Synonyms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {word.synonyms.map((syn) => (
                  <span
                    key={syn}
                    className="px-2 py-1 bg-luxury-gold/10 text-luxury-gold text-xs rounded-md"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Antonyms
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {word.antonyms.map((ant) => (
                  <span
                    key={ant}
                    className="px-2 py-1 bg-danger-red/10 text-danger-red text-xs rounded-md"
                  >
                    {ant}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Source Info */}
          <div className="p-3 bg-secondary/30 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">From:</span>
              <span className="text-sm font-medium text-foreground">
                {word.source}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{word.episode}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-luxury-gold" />
                <span className="text-lg font-bold text-foreground">
                  {word.mastery}%
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase">
                Mastery
              </span>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-3 h-3 text-electric-purple" />
                <span className="text-lg font-bold text-foreground">
                  {word.timesReviewed}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase">
                Reviews
              </span>
            </div>
            <div className="p-3 bg-card border border-border rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-[10px] text-muted-foreground">
                {word.lastReviewed}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/30"
          >
            Review Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function VaultPage() {
  const router = useRouter()
  const { vocabularyList } = useAppStore()
  const [selectedWord, setSelectedWord] = useState<(typeof mockArchives)[0] | null>(null)
  const [archives, setArchives] = useState(mockArchives)

  // 合并 store 中的词汇到 archives
  useEffect(() => {
    if (vocabularyList.length > 0) {
      const storeWords = vocabularyList.map((v, index) => ({
        id: 100 + index,
        word: v.word,
        pos: v.part_of_speech || 'Unknown',
        posShort: (v.part_of_speech || 'Unk').slice(0, 3),
        phonetic: '',
        definition: v.definition,
        fullDefinition: v.definition,
        level: getLevelFromDifficulty(v.difficulty_level),
        source: 'Added',
        episode: 'User Added',
        scene: '/images/scene-power.jpg',
        examples: v.example_sentence ? [v.example_sentence] : [],
        synonyms: [],
        antonyms: [],
        timesReviewed: v.review_count,
        lastReviewed: 'Recently',
        mastery: v.mastery_level,
      }))
      setArchives([...storeWords, ...mockArchives])
    }
  }, [vocabularyList])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">
                My Words
              </h1>
              <p className="text-sm text-muted-foreground">
                {archives.length} words collected
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8 overflow-y-auto">
          <div className="space-y-4 mt-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center gap-3 px-4 py-3 bg-secondary/80 border border-border rounded-xl">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search words..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* Collapsible Stats */}
            <CollapsibleSection title="CEFR Distribution">
              <CEFRChart />
            </CollapsibleSection>

            <CollapsibleSection title="Source Breakdown">
              <SourceBreakdown />
            </CollapsibleSection>

            {/* Vocabulary List */}
            <div className="space-y-3 mt-4">
              {archives.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedWord(item)}
                  className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-electric-purple/50 transition-all cursor-pointer"
                >
                  <div className="flex items-stretch">
                    {/* Scene Thumbnail */}
                    <div className="w-20 h-24 flex-shrink-0 relative overflow-hidden">
                      <img
                        src={item.scene || '/placeholder.svg'}
                        alt={item.episode}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
                      {/* CEFR Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="px-1.5 py-0.5 bg-black/60 text-white text-[10px] font-bold rounded">
                          {item.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-base font-bold text-foreground truncate">
                          {item.word}
                        </h3>
                        <span className="flex-shrink-0 px-1.5 py-0.5 bg-electric-purple/10 text-electric-purple text-[10px] font-bold uppercase rounded">
                          {item.posShort}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">
                        {item.definition}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground/70">
                          {item.source}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="text-[10px] text-muted-foreground/70">
                          {item.mastery}% mastery
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center pr-3">
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-electric-purple transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Word Detail Modal */}
      <AnimatePresence>
        {selectedWord && (
          <WordDetailModal
            word={selectedWord}
            onClose={() => setSelectedWord(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// 根据难度等级返回 CEFR 级别
function getLevelFromDifficulty(difficulty: number): string {
  if (difficulty <= 1) return 'A1'
  if (difficulty <= 2) return 'A2'
  if (difficulty <= 3) return 'B1'
  if (difficulty <= 4) return 'B2'
  if (difficulty <= 5) return 'C1'
  return 'C2'
}
