'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Agent } from '@/types'
import StatusBadge from './StatusBadge'
import AgentModal from './AgentModal'
import { ToggleLeft, ToggleRight } from 'lucide-react'
import clsx from 'clsx'

export default function AgentCard({
  agent,
  compact = false,
}: {
  agent: Agent
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [enabled, setEnabled] = useState(agent.status !== 'idle')

  return (
    <>
      <div
        className={clsx(
          'relative bg-surface-2 border border-surface-3 rounded-2xl transition-all duration-300 cursor-pointer group',
          'hover:border-brown/60 hover:bg-surface-3',
          compact ? 'p-4' : 'p-5'
        )}
        onClick={() => setOpen(true)}
      >
        {/* Hub indicator */}
        {agent.isHub && (
          <div className="absolute top-3 right-3 text-[9px] tracking-[0.18em] text-gold font-semibold uppercase border border-gold/30 px-2 py-0.5 rounded-full bg-gold/10">
            Hub
          </div>
        )}

        {/* Photo + name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gold/50 group-hover:ring-gold transition-all duration-300">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Fallback to initials on missing image
                  e.currentTarget.style.display = 'none'
                }}
              />
              {/* Fallback initials */}
              <div className="absolute inset-0 flex items-center justify-center bg-brown text-gold font-serif text-lg font-semibold">
                {agent.name[0]}
              </div>
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-serif text-lg text-cream leading-tight">{agent.name}</p>
            <p className="text-[10px] tracking-[0.12em] uppercase text-cream-dim truncate">
              {agent.title}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-3">
          <StatusBadge status={agent.status} />
        </div>

        {/* Current task */}
        <p className="text-xs text-cream-dim leading-relaxed line-clamp-2 mb-4">
          {agent.currentTask}
        </p>

        {/* Toggle */}
        <div
          className="flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation()
            setEnabled((v) => !v)
          }}
        >
          {enabled ? (
            <ToggleRight size={20} className="text-gold" />
          ) : (
            <ToggleLeft size={20} className="text-cream-dim" />
          )}
          <span className="text-[10px] tracking-[0.12em] uppercase text-cream-dim">
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {open && <AgentModal agent={agent} onClose={() => setOpen(false)} />}
    </>
  )
}
