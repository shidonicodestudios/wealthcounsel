'use client'

import { useState } from 'react'
import { Task, TaskStatus, TaskPriority } from '@/types'
import { initialTasks } from '@/data/index'
import { agents } from '@/data/agents'
import { Plus, X } from 'lucide-react'
import clsx from 'clsx'

const columns: { key: TaskStatus; label: string }[] = [
  { key: 'queued', label: 'Queued' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'complete', label: 'Complete' },
]

const priorityStyle: Record<TaskPriority, string> = {
  high: 'bg-pink-soft/20 text-pink-soft border-pink-soft/30',
  medium: 'bg-gold/10 text-gold border-gold/30',
  low: 'bg-olive/20 text-olive-light border-olive/30',
}

function TaskCard({ task, onMove }: { task: Task; onMove: (id: string, status: TaskStatus) => void }) {
  const agent = agents.find((a) => a.id === task.agentId)
  const statuses: TaskStatus[] = ['queued', 'in-progress', 'complete']
  const currentIdx = statuses.indexOf(task.status)

  return (
    <div className="bg-surface-3 border border-surface-3 hover:border-brown/50 rounded-xl p-4 space-y-3 transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-cream leading-snug font-medium">{task.title}</p>
        <span
          className={clsx(
            'flex-shrink-0 text-[9px] tracking-[0.12em] uppercase border px-2 py-0.5 rounded-full font-semibold',
            priorityStyle[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>
      {task.notes && (
        <p className="text-xs text-cream-dim leading-relaxed line-clamp-2">{task.notes}</p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gold/60 flex-shrink-0" />
          <span className="text-xs text-cream-dim">{agent?.name}</span>
        </div>
        <div className="flex gap-1">
          {currentIdx > 0 && (
            <button
              onClick={() => onMove(task.id, statuses[currentIdx - 1])}
              className="text-[10px] text-cream-dim hover:text-cream px-2 py-0.5 rounded bg-surface-2 hover:bg-surface-3 transition-colors"
            >
              ←
            </button>
          )}
          {currentIdx < statuses.length - 1 && (
            <button
              onClick={() => onMove(task.id, statuses[currentIdx + 1])}
              className="text-[10px] text-gold hover:text-gold-light px-2 py-0.5 rounded bg-gold/10 hover:bg-gold/20 transition-colors"
            >
              →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    agentId: 'sage',
    priority: 'medium' as TaskPriority,
    notes: '',
  })

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  const addTask = () => {
    if (!form.title.trim()) return
    const newTask: Task = {
      id: `t${Date.now()}`,
      ...form,
      status: 'queued',
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
    setForm({ title: '', agentId: 'sage', priority: 'medium', notes: '' })
    setShowForm(false)
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl text-cream tracking-wide">Task Board</h1>
          <p className="text-sm text-cream-dim mt-1">Track all active and queued work</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl text-gold text-sm transition-colors"
        >
          <Plus size={14} />
          New Task
        </button>
      </div>

      {/* New task form */}
      {showForm && (
        <div className="bg-surface-2 border border-surface-3 rounded-2xl p-5 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gold font-medium">New Task</p>
            <button onClick={() => setShowForm(false)} className="text-cream-dim hover:text-cream">
              <X size={14} />
            </button>
          </div>
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-surface-3 border border-surface-3 focus:border-gold/40 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream-dim/40 outline-none"
          />
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full bg-surface-3 border border-surface-3 focus:border-gold/40 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream-dim/40 outline-none resize-none"
          />
          <div className="flex gap-3">
            <select
              value={form.agentId}
              onChange={(e) => setForm({ ...form, agentId: e.target.value })}
              className="flex-1 bg-surface-3 border border-surface-3 rounded-xl px-4 py-3 text-sm text-cream outline-none"
            >
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as TaskPriority })}
              className="flex-1 bg-surface-3 border border-surface-3 rounded-xl px-4 py-3 text-sm text-cream outline-none"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <button
            onClick={addTask}
            className="px-5 py-2.5 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl text-gold text-sm transition-colors"
          >
            Add Task
          </button>
        </div>
      )}

      {/* Kanban columns */}
      <div className="grid grid-cols-3 gap-5">
        {columns.map(({ key, label }) => {
          const colTasks = tasks.filter((t) => t.status === key)
          return (
            <div key={key} className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-cream-dim font-semibold">
                  {label}
                </p>
                <span className="text-[10px] bg-surface-3 text-cream-dim px-1.5 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-3 min-h-24">
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onMove={moveTask} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
