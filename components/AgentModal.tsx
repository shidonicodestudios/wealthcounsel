'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Agent } from '@/types'
import StatusBadge from './StatusBadge'
import { X, Send } from 'lucide-react'

export default function AgentModal({
  agent,
  onClose,
}: {
  agent: Agent
  onClose: () => void
}) {
  const [command, setCommand] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!command.trim()) return
    // TODO (Sage): wire this to agent's actual API endpoint
    console.log(`Command to ${agent.name}:`, command)
    setSent(true)
    setCommand('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-surface border-l border-surface-3 overflow-y-auto panel-scroll animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-surface-3 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-serif text-2xl text-cream">{agent.name}</p>
            <p className="text-[10px] tracking-[0.15em] uppercase text-cream-dim">
              {agent.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-3 text-cream-dim hover:text-cream transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Photo + status */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-gold/60 flex-shrink-0">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-brown text-gold font-serif text-2xl font-semibold">
                {agent.name[0]}
              </div>
            </div>
            <div className="space-y-2">
              <StatusBadge status={agent.status} />
              <p className="text-xs text-cream-dim">{agent.role}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-2">About</p>
            <p className="text-sm text-cream-muted leading-relaxed">{agent.description}</p>
          </div>

          {/* Current task */}
          <div className="bg-surface-2 rounded-xl p-4 border border-surface-3">
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-2">Current Task</p>
            <p className="text-sm text-cream leading-relaxed">{agent.currentTask}</p>
          </div>

          {/* Last action */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-2">Last Action</p>
            <p className="text-xs text-cream-dim font-mono">{agent.lastAction}</p>
          </div>

          {/* Command input */}
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-gold mb-3">
              Send Command
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Instruct ${agent.name}...`}
                className="flex-1 bg-surface-3 border border-surface-3 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream-dim/40 outline-none transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-11 h-11 flex items-center justify-center bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl text-gold transition-colors"
              >
                <Send size={15} />
              </button>
            </div>
            {sent && (
              <p className="text-xs text-olive-light mt-2 animate-fade-in">
                ✓ Command sent to {agent.name}
              </p>
            )}
            <p className="text-[10px] text-cream-dim/40 mt-2">
              {/* TODO (Sage): replace with live agent endpoint */}
              API endpoint: <span className="font-mono">process.env.{agent.name.toUpperCase()}_API_URL</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
