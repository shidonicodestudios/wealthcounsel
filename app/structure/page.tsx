'use client'

import { useState } from 'react'
import Image from 'next/image'
import { agents } from '@/data/agents'
import { Agent } from '@/types'
import StatusBadge from '@/components/StatusBadge'
import AgentModal from '@/components/AgentModal'

function AgentNode({
  agent,
  large = false,
  onClick,
}: {
  agent: Agent
  large?: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center cursor-pointer group transition-all duration-300
        ${large ? 'scale-110' : ''}
      `}
    >
      {/* Photo ring */}
      <div
        className={`
          relative rounded-full overflow-hidden ring-2 ring-gold/40 group-hover:ring-gold transition-all duration-300 mb-3
          ${large ? 'w-24 h-24' : 'w-16 h-16'}
        `}
      >
        <Image
          src={agent.photo}
          alt={agent.name}
          width={large ? 96 : 64}
          height={large ? 96 : 64}
          className="object-cover w-full h-full"
        />
        {/* Initials fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-brown text-gold font-serif font-semibold"
          style={{ fontSize: large ? '2rem' : '1.25rem' }}>
          {agent.name[0]}
        </div>
      </div>

      {/* Name + title */}
      <p className={`font-serif text-cream text-center group-hover:text-gold transition-colors ${large ? 'text-xl' : 'text-base'}`}>
        {agent.name}
      </p>
      <p className="text-[9px] tracking-[0.14em] uppercase text-cream-dim text-center mt-0.5 max-w-[110px]">
        {agent.title}
      </p>
      <div className="mt-2">
        <StatusBadge status={agent.status} />
      </div>
    </div>
  )
}

export default function StructurePage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  const hub = agents.find((a) => a.isHub)!
  const spokes = agents.filter((a) => !a.isHub)

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Team Structure</h1>
        <p className="text-sm text-cream-dim mt-1">
          Hub-and-spoke hierarchy — click any agent to command
        </p>
      </div>

      {/* Org chart */}
      <div className="relative flex flex-col items-center pt-8 pb-16">

        {/* Hub agent */}
        <div className="relative z-10 mb-0">
          <AgentNode agent={hub} large onClick={() => setSelectedAgent(hub)} />
        </div>

        {/* Connector lines — SVG */}
        <div className="relative w-full" style={{ height: '80px' }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 900 80"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {/* Vertical stem from hub down */}
            <line x1="450" y1="0" x2="450" y2="40" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
            {/* Horizontal bar */}
            <line x1="112" y1="40" x2="788" y2="40" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
            {/* Vertical drops to each spoke */}
            <line x1="112" y1="40" x2="112" y2="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="338" y1="40" x2="338" y2="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="562" y1="40" x2="562" y2="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="788" y1="40" x2="788" y2="80" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* Spoke agents */}
        <div className="grid grid-cols-4 gap-8 w-full max-w-4xl mt-0">
          {spokes.map((agent) => (
            <AgentNode
              key={agent.id}
              agent={agent}
              onClick={() => setSelectedAgent(agent)}
            />
          ))}
        </div>
      </div>

      {/* Role descriptions */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => setSelectedAgent(agent)}
            className="bg-surface-2 border border-surface-3 hover:border-brown/50 rounded-2xl p-4 cursor-pointer transition-all duration-200 group"
          >
            <p className="font-serif text-lg text-cream group-hover:text-gold transition-colors mb-1">
              {agent.name}
            </p>
            <p className="text-[9px] tracking-[0.12em] uppercase text-gold mb-2">{agent.role}</p>
            <p className="text-xs text-cream-dim leading-relaxed line-clamp-3">
              {agent.description}
            </p>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  )
}
