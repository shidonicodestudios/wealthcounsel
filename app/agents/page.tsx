import React from 'react'
import { agents } from '@/data/agents'
import AgentCard from '@/components/AgentCard'

export default function AgentsPage() {
  const hub = agents.filter((a) => a.isHub)
  const spokes = agents.filter((a) => !a.isHub)

  return (
    <div className="p-8 space-y-10 animate-fade-in">
      <div>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Agents</h1>
        <p className="text-sm text-cream-dim mt-1">Full roster — click any agent to command</p>
      </div>

      {/* Hub agent */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Hub Agent</p>
        <div className="max-w-xs">
          {hub.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Sub-agents */}
      <div>
        <p className="text-[10px] tracking-[0.2em] uppercase text-gold mb-4">Sub-Agents</p>
        <div className="grid grid-cols-2 gap-5">
          {spokes.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  )
}
