'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'

export default function ProfilePage() {
  const { userSettings, setUserSettings } = useAppStore()

  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const [cefrLevel, setCefrLevel] = useState<string>(userSettings?.english_level || 'B1')
  const [definitionMode, setDefinitionMode] = useState<'en' | 'native'>('en')
  const [perspective, setPerspective] = useState<'male' | 'female' | 'neutral'>('neutral')
  const [wordsPerReview, setWordsPerReview] = useState<number>(userSettings?.words_per_review || 5)

  const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

  const handleReset = () => {
    if (confirm('Reset all data?')) {
      // Reset settings
      setLang('en')
      setCefrLevel('B1')
      setDefinitionMode('en')
      setPerspective('neutral')
      setWordsPerReview(5)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态渐变背景 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(-45deg, #0f172a, #1e1b4b, #312e81, #0f172a)',
          backgroundSize: '400% 400%',
          animation: 'gradientBG 15s ease infinite',
        }}
      />

      {/* 光晕效果 */}
      <div
        className="fixed w-[300px] h-[300px] rounded-full opacity-50 -top-[50px] -left-[100px] -z-5 pointer-events-none"
        style={{
          background: '#4f46e5',
          filter: 'blur(70px)',
          animation: 'float 10s infinite ease-in-out',
        }}
      />
      <div
        className="fixed w-[200px] h-[200px] rounded-full opacity-50 bottom-[100px] -right-[50px] -z-5 pointer-events-none"
        style={{
          background: '#ec4899',
          filter: 'blur(70px)',
          animation: 'float 10s infinite ease-in-out',
          animationDelay: '-5s',
        }}
      />

      <div className="container mx-auto px-6 py-8 pb-32 max-w-md">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[32px] font-extrabold leading-tight mb-6"
        >
          Profile
        </motion.h1>

        {/* Interface Language Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3 uppercase">
            Interface Language
          </div>
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          >
            <button
              onClick={() => setLang('en')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
                lang === 'en'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang('zh')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-semibold transition-all ${
                lang === 'zh'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              中文
            </button>
          </div>
        </motion.div>

        {/* CEFR Level Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3 uppercase">
            English Level (CEFR)
          </div>
          <div className="grid grid-cols-3 gap-2">
            {cefrLevels.map((level) => (
              <button
                key={level}
                onClick={() => setCefrLevel(level)}
                className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                  cefrLevel === level
                    ? 'text-black scale-[1.02]'
                    : 'text-white/60'
                }`}
                style={{
                  background:
                    cefrLevel === level
                      ? '#06b6d4'
                      : 'rgba(255, 255, 255, 0.05)',
                  border:
                    cefrLevel === level
                      ? '1px solid #06b6d4'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    cefrLevel === level
                      ? '0 0 15px rgba(6, 182, 212, 0.4)'
                      : 'none',
                }}
              >
                {level}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Definitions & Perspective Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-3xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3 uppercase">
            Definitions
          </div>
          <div
            className="flex p-1 rounded-xl gap-1 mb-5"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          >
            <button
              onClick={() => setDefinitionMode('en')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                definitionMode === 'en'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              English Sent.
            </button>
            <button
              onClick={() => setDefinitionMode('native')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                definitionMode === 'native'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              Native Trans.
            </button>
          </div>

          <div className="text-[11px] font-bold tracking-wider text-white/60 mb-3 uppercase">
            Perspective
          </div>
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          >
            <button
              onClick={() => setPerspective('male')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                perspective === 'male'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              Male
            </button>
            <button
              onClick={() => setPerspective('female')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                perspective === 'female'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              Female
            </button>
            <button
              onClick={() => setPerspective('neutral')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                perspective === 'neutral'
                  ? 'bg-white/12 text-white shadow'
                  : 'text-white/60'
              }`}
            >
              Neutral
            </button>
          </div>
        </motion.div>

        {/* Words per Review Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-5 mb-4"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-[11px] font-bold tracking-wider text-white/60 uppercase">
              Words per Review
            </div>
            <div className="text-lg font-extrabold text-purple-400">
              {wordsPerReview}
            </div>
          </div>
          <input
            type="range"
            min={3}
            max={20}
            value={wordsPerReview}
            onChange={(e) => setWordsPerReview(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
        </motion.div>

        {/* Reset Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleReset}
          className="w-full py-4 rounded-2xl font-bold transition-all"
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            color: '#f43f5e',
            border: '1px solid #f43f5e',
          }}
        >
          Reset All Data
        </motion.button>
      </div>

      {/* CSS Keyframes */}
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 40px); }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}
