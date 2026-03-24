'use client'

import { useState, useEffect } from 'react'
import { agents } from '@/data/agents'
import { CronJob } from '@/types'
import { CheckCircle, XCircle, Clock } from 'lucide-react'
import clsx from 'clsx'

const agentColors: Record<string, string> = {
  sage: 'border-gold/60 bg-gold/10 text-gold',
  ingrid: 'border-pink-muted/60 bg-pink-soft/10 text-pink-muted',
  margo: 'border-olive-light/60 bg-olive/10 text-olive-light',
  vesper: 'border-gold-dark/60 bg-gold-dark/10 text-gold-dark',
  wren: 'border-brown-light/60 bg-brown/10 text-brown-light',
}

const agentDots: Record<string, string> = {
  sage: 'bg-gold',
  ingrid: 'bg-pink-muted',
  margo: 'bg-olive-light',
  vesper: 'bg-gold-dark',
  wren: 'bg-brown-light',
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusIcon({ status }: { status: CronJob['lastStatus'] }) {
  if (status === 'success') return <CheckCircle size={14} className="text-olive-light" />
  if (status === 'failed') return <XCircle size={14} className="text-red-400" />
  return <Clock size={14} className="text-gold" />
}

export default function CalendarPage() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<CronJob | null>(null)

  useEffect(() => {
    fetchCrons()
  }, [])

  const fetchCrons = async () => {
    try {
      const response = await fetch('/api/proxy/crons')
      if (response.ok) {
        const data = await response.json()
        setCronJobs(data)
      }
    } catch (error) {
      console.error('Error fetching crons:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <p className="text-cream-dim">Loading cron jobs...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Calendar</h1>
        <p className="text-sm text-cream-dim mt-1">Scheduled cron jobs and upcoming runs</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 flex-wrap">
        {agents.map((a) => (
          <div key={a.id} className="flex items-center gap-2">
            <span className={clsx('w-2.5 h-2.5 rounded-full', agentDots[a.id])} />
            <span className="text-xs text-cream-dim">{a.name}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Cron job list */}
        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.18em] uppercase text-cream-dim mb-4">
            All Jobs
          </p>
          {cronJobs.map((job) => {
            const agent = agents.find((a) => a.id === job.agentId)
            return (
              <div
                key={job.id}
                onClick={() => setSelected(selected?.id === job.id ? null : job)}
                className={clsx(
                  'bg-surface-2 border rounded-2xl p-4 cursor-pointer transition-all duration-200',
                  selected?.id === job.id
                    ? 'border-gold/40 bg-surface-3'
                    : 'border-surface-3 hover:border-brown/50'
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', agentDots[job.agentId])} />
                    <p className="text-sm text-cream font-medium">{job.name}</p>
                  </div>
                  <StatusIcon status={job.lastStatus} />
                </div>
                <p className="text-xs text-cream-dim mb-1 pl-4">{job.schedule}</p>
                <p className="text-xs text-cream-dim/50 pl-4 font-mono">
                  Next: {formatDateTime(job.nextRun)}
                </p>
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-cream-dim mb-4">
            Job Detail
          </p>
          {selected ? (
            <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-5 animate-fade-in">
              {/* Agent tag */}
              <div>
                {(() => {
                  const agent = agents.find((a) => a.id === selected.agentId)
                  return (
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1.5 text-xs border px-3 py-1 rounded-full',
                        agentColors[selected.agentId]
                      )}
                    >
                      <span className={clsx('w-1.5 h-1.5 rounded-full', agentDots[selected.agentId])} />
                      {agent?.name}
                    </span>
                  )
                })()}
              </div>

              <div>
                <p className="font-serif text-2xl text-cream">{selected.name}</p>
              </div>

              <div className="space-y-3">
                {[
                  { label: 'Schedule', value: selected.schedule },
                  { label: 'Next Run', value: formatDateTime(selected.nextRun) },
                  { label: 'Last Run', value: formatDateTime(selected.lastRun) },
                  { label: 'Last Status', value: selected.lastStatus },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b border-surface-3 pb-3">
                    <span className="text-xs text-cream-dim uppercase tracking-widest">{label}</span>
                    <span
                      className={clsx(
                        'text-xs font-mono',
                        label === 'Last Status'
                          ? selected.lastStatus === 'success'
                            ? 'text-olive-light'
                            : selected.lastStatus === 'failed'
                            ? 'text-red-400'
                            : 'text-gold'
                          : 'text-cream'
                      )}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cron editing via OpenClaw Control UI (port 54984) */}
              <div className="bg-surface-3 rounded-xl p-3">
                <p className="text-[10px] tracking-[0.12em] uppercase text-gold mb-1">Config Source</p>
                <p className="text-xs text-cream-dim font-mono">
                  OpenClaw Gateway: http://100.94.225.15:54984
                </p>
                <p className="text-[9px] text-cream-dim/60 mt-1">
                  Cron jobs managed via OpenClaw Control UI (edit there)
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 flex items-center justify-center h-48">
              <p className="text-sm text-cream-dim/40">Select a job to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
