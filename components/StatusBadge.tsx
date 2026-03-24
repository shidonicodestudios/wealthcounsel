import { AgentStatus } from '@/types'
import clsx from 'clsx'

const config: Record<AgentStatus, { label: string; dot: string; text: string; bg: string }> = {
  active: {
    label: 'ACTIVE',
    dot: 'bg-olive-light',
    text: 'text-olive-light',
    bg: 'bg-olive/20 border-olive/30',
  },
  idle: {
    label: 'IDLE',
    dot: 'bg-brown-light',
    text: 'text-cream-dim',
    bg: 'bg-brown/20 border-brown/30',
  },
  running: {
    label: 'RUNNING',
    dot: 'bg-gold status-running',
    text: 'text-gold',
    bg: 'bg-gold/10 border-gold/30',
  },
}

export default function StatusBadge({ status }: { status: AgentStatus }) {
  const c = config[status]
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] tracking-[0.15em] font-semibold border',
        c.bg,
        c.text
      )}
    >
      <span className={clsx('w-1.5 h-1.5 rounded-full', c.dot)} />
      {c.label}
    </span>
  )
}
