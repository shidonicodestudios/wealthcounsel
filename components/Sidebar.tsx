'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  CalendarDays,
  GitFork,
  ScrollText,
} from 'lucide-react'
import clsx from 'clsx'

const nav = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/agents', label: 'Agents', icon: Users },
  { href: '/tasks', label: 'Task Board', icon: KanbanSquare },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/structure', label: 'Team Structure', icon: GitFork },
  { href: '/log', label: 'Activity Log', icon: ScrollText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-3 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-8 border-b border-surface-3">
        <p className="font-serif text-xl text-gold tracking-wide leading-tight">
          The Wealth Counsel
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-cream-dim mt-1">
          Command Room
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-surface-3 text-gold border border-brown/40'
                  : 'text-cream-dim hover:text-cream hover:bg-surface-2'
              )}
            >
              <Icon size={16} className={active ? 'text-gold' : 'text-cream-dim'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom status */}
      <div className="px-6 py-5 border-t border-surface-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-olive-light status-running" />
          <span className="text-xs text-cream-dim">System online</span>
        </div>
        <p className="text-xs text-cream-dim/50 mt-1 font-mono">v0.1.0</p>
      </div>
    </aside>
  )
}
