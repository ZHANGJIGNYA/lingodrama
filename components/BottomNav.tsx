'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Archive, Film, Zap, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
    label: '看板',
  },
  {
    name: 'Vault',
    href: '/vault',
    icon: Archive,
    label: '金库',
  },
  {
    name: 'Review',
    href: '/review',
    icon: Film,
    label: '剧场',
  },
  {
    name: 'Quiz',
    href: '/quiz',
    icon: Zap,
    label: '挑战',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    label: '设置',
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="max-w-screen-sm mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 transition-colors',
                  'min-w-[64px] py-1',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'w-6 h-6 transition-transform',
                    isActive && 'scale-110'
                  )}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
