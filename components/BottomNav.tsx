'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Play, User } from 'lucide-react'

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Review',
    href: '/review',
    icon: Play,
  },
  {
    name: 'Words',
    href: '/vault',
    icon: BookOpen,
  },
  {
    name: 'Profile',
    href: '/settings',
    icon: User,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  // 在某些页面隐藏导航栏
  const hiddenPaths = ['/quiz']
  if (hiddenPaths.some(path => pathname.startsWith(path))) {
    return null
  }

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full flex gap-8"
      style={{
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center"
          >
            <Icon
              className={`w-5 h-5 transition-all duration-300 ${
                isActive
                  ? 'text-danger-red -translate-y-0.5'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{
                filter: isActive ? 'drop-shadow(0 0 8px rgba(229, 9, 20, 0.5))' : 'none',
              }}
            />
            {isActive && (
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-danger-red"
                style={{
                  boxShadow: '0 0 6px rgba(229, 9, 20, 0.8)',
                }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
