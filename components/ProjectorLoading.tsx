'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ProjectorLoading() {
  const [stage, setStage] = useState<'projector' | 'curtain' | 'done'>('projector')

  useEffect(() => {
    const projectorTimer = setTimeout(() => setStage('curtain'), 2000)
    const curtainTimer = setTimeout(() => setStage('done'), 3500)
    return () => {
      clearTimeout(projectorTimer)
      clearTimeout(curtainTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden film-grain vignette">
      {stage === 'projector' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-center z-10"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -left-20 top-8 w-16 h-16 rounded-full border-8 border-amber-600"
                style={{
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                }}
              />

              <div className="text-9xl">🎬</div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -right-20 top-8 w-16 h-16 rounded-full border-8 border-amber-600"
                style={{
                  borderTopColor: 'transparent',
                  borderLeftColor: 'transparent',
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                width: ['0px', '300px', '0px'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-1/2 h-32 bg-gradient-to-r from-amber-400/0 via-amber-400/40 to-amber-400/0"
              style={{
                transform: 'translateY(-50%) rotate(-10deg)',
                transformOrigin: 'left center',
                filter: 'blur(20px)',
              }}
            />
          </div>

          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-12 text-amber-400 text-xl font-mono tracking-wider"
          >
            LOADING FILM...
          </motion.div>

          <div className="flex gap-2 justify-center mt-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-4 bg-amber-600 rounded-sm"
              />
            ))}
          </div>
        </motion.div>
      )}

      {stage === 'curtain' && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-y-0 left-0 w-1/2 z-20"
            style={{
              background: 'linear-gradient(to right, #1a0a0a 0%, #4a1a1a 80%, #8a3a3a 100%)',
              boxShadow: '20px 0 60px rgba(0,0,0,0.9)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-amber-600/80 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="absolute inset-y-0 right-0 w-1/2 z-20"
            style={{
              background: 'linear-gradient(to left, #1a0a0a 0%, #4a1a1a 80%, #8a3a3a 100%)',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.9)',
            }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
              }}
            />
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-600/80 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-radial from-amber-400/20 via-transparent to-transparent z-10"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="text-6xl font-serif text-amber-400 tracking-widest drop-shadow-2xl">
              NOW PLAYING
            </div>
            <div className="text-center mt-4 text-amber-200 text-xl tracking-wider">
              ✦ ✦ ✦
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}

export function ProjectorLoadingMini() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-8 top-3 w-6 h-6 rounded-full border-4 border-amber-600"
          style={{
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
          }}
        />

        <div className="text-5xl">🎬</div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-8 top-3 w-6 h-6 rounded-full border-4 border-amber-600"
          style={{
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
          }}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mt-6 text-amber-400 text-sm font-mono tracking-wider"
      >
        LOADING FILM...
      </motion.div>
    </div>
  )
}
