import { agents } from '@/data/agents'
import { logEntries, cronJobs } from '@/data/index'
import AgentCard from '@/components/AgentCard'
import StatusBadge from '@/components/StatusBadge'

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const statusColor: Record<string, string> = {
  success: 'text-olive-light',
  error: 'text-red-400',
  info: 'text-cream-dim',
  warning: 'text-gold',
}

export default function Dashboard() {
  const activeCount = agents.filter((a) => a.status !== 'idle').length
  const nextCron = cronJobs.sort(
    (a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime()
  )[0]
  const recentLog = logEntries.slice(0, 5)

  return (
    <div className="p-8 space-y-10 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Overview</h1>
        <p className="text-sm text-cream-dim mt-1">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Agents', value: `${activeCount} / ${agents.length}` },
          { label: 'Tasks In Progress', value: '2' },
          {
            label: 'Next Cron Job',
            value: `${nextCron.name} — ${formatTime(nextCron.nextRun)}`,
          },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-surface-2 border border-surface-3 rounded-2xl px-5 py-4"
          >
            <p className="text-[10px] tracking-[0.15em] uppercase text-cream-dim mb-1">{label}</p>
            <p className="font-serif text-xl text-cream">{value}</p>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div>
        <h2 className="font-serif text-2xl text-cream mb-5">The Counsel</h2>
        <div className="grid grid-cols-5 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} compact />
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-cream">Recent Activity</h2>
          <a href="/log" className="text-xs text-gold hover:text-gold-light transition-colors tracking-widest uppercase">
            View all →
          </a>
        </div>
        <div className="bg-surface-2 border border-surface-3 rounded-2xl overflow-hidden">
          {recentLog.map((entry, i) => {
            const agent = agents.find((a) => a.id === entry.agentId)
            return (
              <div
                key={entry.id}
                className={`px-5 py-3.5 flex items-start gap-4 ${
                  i < recentLog.length - 1 ? 'border-b border-surface-3' : ''
                }`}
              >
                <span className="font-mono text-xs text-cream-dim/50 flex-shrink-0 pt-0.5 w-12">
                  {formatTime(entry.timestamp)}
                </span>
                <span className="text-xs text-gold font-semibold flex-shrink-0 w-14 pt-0.5">
                  {agent?.name}
                </span>
                <span className={`text-xs flex-1 leading-relaxed ${statusColor[entry.status]}`}>
                  {entry.action}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
