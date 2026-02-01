'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppStore()

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
      root.classList.remove('light')
    }
  }, [theme])

  return <>{children}</>
}
