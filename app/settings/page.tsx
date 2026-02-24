'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Sun, Moon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const router = useRouter()
  const { userSettings, setUserSettings, interfaceLanguage, setInterfaceLanguage, theme, setTheme } = useAppStore()

  const [cefrLevel, setCefrLevel] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1'>(userSettings?.english_level || 'B1')
  const [definitionStyle, setDefinitionStyle] = useState<'english' | 'native'>(
    userSettings?.definition_preference === 'native_language' ? 'native' : 'english'
  )
  const [perspective, setPerspective] = useState<'male' | 'female' | 'neutral'>(
    (userSettings?.gender as 'male' | 'female' | 'neutral') || 'neutral'
  )
  const [wordsPerReview, setWordsPerReview] = useState<number>(userSettings?.words_per_review || 5)

  const cefrLevels: Array<'A1' | 'A2' | 'B1' | 'B2' | 'C1'> = ['A1', 'A2', 'B1', 'B2', 'C1']

  const handleSave = () => {
    if (userSettings) {
      setUserSettings({
        ...userSettings,
        english_level: cefrLevel,
        words_per_review: wordsPerReview as 3 | 5 | 8,
        definition_preference: definitionStyle === 'native' ? 'native_language' : 'english_only',
        gender: perspective,
      })
      alert('Settings saved successfully!')
    }
  }

  const handleReset = () => {
    if (confirm('Reset all data?')) {
      setInterfaceLanguage('en')
      setTheme('dark')
      setCefrLevel('B1')
      setDefinitionStyle('english')
      setPerspective('neutral')
      setWordsPerReview(5)
      if (userSettings) {
        setUserSettings({
          ...userSettings,
          english_level: 'B1',
          words_per_review: 5,
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Container */}
      <div className="mx-auto max-w-md min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-4 pt-6 pb-2">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.push('/')}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-purple to-danger-red flex items-center justify-center">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-foreground">
                Profile Settings
              </h1>
              <p className="text-sm text-muted-foreground">
                Customize your learning experience
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8 overflow-y-auto">
          <div className="space-y-4">
            {/* Interface Language */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-card border border-border rounded-xl"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Interface Language
              </h3>
              <div className="flex gap-2 p-1 bg-secondary rounded-lg">
                <button
                  type="button"
                  onClick={() => setInterfaceLanguage('en')}
                  className={cn(
                    'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200',
                    interfaceLanguage === 'en'
                      ? 'bg-card text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setInterfaceLanguage('zh')}
                  className={cn(
                    'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200',
                    interfaceLanguage === 'zh'
                      ? 'bg-card text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  中文
                </button>
              </div>
            </motion.div>

            {/* Theme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-card border border-border rounded-xl"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Theme
              </h3>
              <div className="flex gap-2 p-1 bg-secondary rounded-lg">
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={cn(
                    'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
                    theme === 'dark'
                      ? 'bg-card text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={cn(
                    'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2',
                    theme === 'light'
                      ? 'bg-card text-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
              </div>
            </motion.div>

            {/* CEFR Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-card border border-border rounded-xl"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                English Level (CEFR)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {cefrLevels.map((level) => (
                  <motion.button
                    key={level}
                    type="button"
                    onClick={() => setCefrLevel(level)}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 border',
                      cefrLevel === level
                        ? 'bg-electric-purple text-white border-electric-purple shadow-lg shadow-electric-purple/30'
                        : 'bg-secondary text-muted-foreground border-border hover:border-electric-purple/50 hover:text-foreground'
                    )}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Definitions & Perspective */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-card border border-border rounded-xl space-y-4"
            >
              {/* Definitions */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Definitions
                </h3>
                <div className="flex gap-2 p-1 bg-secondary rounded-lg">
                  <button
                    type="button"
                    onClick={() => setDefinitionStyle('english')}
                    className={cn(
                      'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200',
                      definitionStyle === 'english'
                        ? 'bg-card text-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    English Sent.
                  </button>
                  <button
                    type="button"
                    onClick={() => setDefinitionStyle('native')}
                    className={cn(
                      'flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200',
                      definitionStyle === 'native'
                        ? 'bg-card text-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Native Trans.
                  </button>
                </div>
              </div>

              {/* Perspective */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Perspective
                </h3>
                <div className="flex gap-2 p-1 bg-secondary rounded-lg">
                  {(['male', 'female', 'neutral'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPerspective(option)}
                      className={cn(
                        'flex-1 py-2.5 px-3 rounded-md text-sm font-medium capitalize transition-all duration-200',
                        perspective === option
                          ? 'bg-card text-foreground shadow-md'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Words Per Review */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-card border border-border rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Words Per Review
                </h3>
                <span className="text-2xl font-bold text-electric-purple">
                  {wordsPerReview}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={wordsPerReview}
                  onChange={(e) => setWordsPerReview(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-electric-purple
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:shadow-electric-purple/30
                    [&::-webkit-slider-thumb]:border-2
                    [&::-webkit-slider-thumb]:border-electric-purple
                    [&::-moz-range-thumb]:w-5
                    [&::-moz-range-thumb]:h-5
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-2
                    [&::-moz-range-thumb]:border-electric-purple"
                />
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </motion.div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
              {/* Save Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                type="button"
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-danger-red text-white font-semibold rounded-xl shadow-lg shadow-danger-red/30"
              >
                Save Changes
              </motion.button>

              {/* Reset Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="button"
                onClick={handleReset}
                className="w-full py-3.5 bg-secondary text-muted-foreground font-semibold rounded-xl border border-border hover:text-foreground transition-colors"
              >
                Reset All Data
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
