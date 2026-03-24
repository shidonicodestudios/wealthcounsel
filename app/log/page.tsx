'use client'

import { useState } from 'react'
import { logEntries } from '@/data/index'
import { agents } from '@/data/agents'
import { LogEntry } from '@/types'
import clsx from 'clsx'

const statusStyle: Record<LogEntry['status'], { dot: string; text: string; label: string }> = {
  success: { dot: 'bg-olive-light', text: 'text-olive-light', label: 'SUCCESS' },
  error: { dot: 'bg-red-400', text: 'text-red-400', label: 'ERROR' },
  info: { dot: 'bg-cream-dim', text: 'text-cream-dim', label: 'INFO' },
  warning: { dot: 'bg-gold', text: 'text-gold', label: 'WARN' },
}

const agentDots: Record<string, string> = {
  sage: 'bg-gold',
  ingrid: 'bg-pink-muted',
  margo: 'bg-olive-light',
  vesper: 'bg-gold-dark',
  wren: 'bg-brown-light',
}

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export default function LogPage() {
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all'
    ? logEntries
    : logEntries.filter((e) => e.agentId === filter)

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Activity Log</h1>
        <p className="text-sm text-cream-dim mt-1">Full chronological feed of all agent activity</p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={clsx(
            'px-3 py-1.5 rounded-lg text-xs tracking-widest uppercase transition-all duration-200',
            filter === 'all'
              ? 'bg-gold/10 border border-gold/40 text-gold'
              : 'border border-surface-3 text-cream-dim hover:text-cream'
          )}
        >
          All
        </button>
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setFilter(agent.id)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs tracking-widest uppercase transition-all duration-200',
              filter === agent.id
                ? 'bg-surface-3 border border-brown/40 text-cream'
                : 'border border-surface-3 text-cream-dim hover:text-cream'
            )}
          >
            <span className={clsx('w-1.5 h-1.5 rounded-full', agentDots[agent.id])} />
            {agent.name}
          </button>
        ))}
      </div>

      {/* Log entries */}
      <div className="bg-surface-2 border border-surface-3 rounded-2xl overflow-hidden panel-scroll">
        {/* Terminal header */}
        <div className="px-5 py-3 border-b border-surface-3 flex items-center gap-2 bg-surface-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-olive/60" />
          </div>
          <span className="text-[10px] font-mono text-cream-dim/50 ml-2 tracking-widest">
            wealth-counsel / activity.log
          </span>
        </div>

        {/* Entries */}
        <div className="divide-y divide-surface-3 max-h-[600px] overflow-y-auto panel-scroll">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-cream-dim/40">
              No entries found
            </div>
          ) : (
            filtered.map((entry) => {
              const agent = agents.find((a) => a.id === entry.agentId)
              const s = statusStyle[entry.status]
              return (
                <div
                  key={entry.id}
                  className="px-5 py-3 flex items-start gap-4 hover:bg-surface-3/50 transition-colors"
                >
                  {/* Timestamp */}
                  <span className="font-mono text-[10px] text-gold/60 flex-shrink-0 pt-0.5 w-36">
                    {formatTimestamp(entry.timestamp)}
                  </span>

                  {/* Status dot */}
                  <span className={clsx('w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5', s.dot)} />

                  {/* Agent */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 w-16">
                    <span className={clsx('w-1.5 h-1.5 rounded-full', agentDots[entry.agentId])} />
                    <span className="text-xs text-cream-dim">{agent?.name}</span>
                  </div>

                  {/* Status label */}
                  <span className={clsx('text-[9px] tracking-[0.15em] font-semibold flex-shrink-0 w-12 pt-0.5', s.text)}>
                    {s.label}
                  </span>

                  {/* Action */}
                  <span className="text-xs text-cream-muted leading-relaxed flex-1">
                    {entry.action}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-olive-light status-running" />
        <span className="text-xs text-cream-dim font-mono">
          {/* TODO (Sage): connect to live WebSocket feed */}
          Live feed ready — connect via{' '}
          <span className="text-gold">process.env.LOG_WEBSOCKET_URL</span>
        </span>
      </div>
    </div>
  )
}
