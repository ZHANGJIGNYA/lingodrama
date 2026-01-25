'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, User } from 'lucide-react'

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Vocabulary',
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

  // 在 review 页面隐藏导航栏
  if (pathname === '/review') {
    return null
  }

  return (
    <nav
      className="fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 px-[30px] py-3 rounded-[40px] flex gap-10"
      style={{
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative"
          >
            <Icon
              className={`w-5 h-5 transition-all duration-300 ${
                isActive
                  ? 'text-white -translate-y-[3px]'
                  : 'text-white/40 hover:text-white/70'
              }`}
              style={{
                textShadow: isActive ? '0 0 15px rgba(255, 255, 255, 0.4)' : 'none',
              }}
            />
            {isActive && (
              <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
