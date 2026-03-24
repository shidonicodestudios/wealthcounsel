'use client'

import { useState, useEffect } from 'react'
import { Task, TaskStatus, TaskPriority } from '@/types'
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
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    title: '',
    agentId: 'sage',
    priority: 'medium' as TaskPriority,
    notes: '',
  })

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/proxy/tasks')
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const moveTask = async (id: string, status: TaskStatus) => {
    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))

    try {
      const response = await fetch(`/api/proxy/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        // Revert on error
        fetchTasks()
      }
    } catch (error) {
      console.error('Error updating task:', error)
      fetchTasks()
    }
  }

  const addTask = async () => {
    if (!form.title.trim()) return

    try {
      const response = await fetch('/api/proxy/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          agentId: form.agentId,
          priority: form.priority,
          notes: form.notes,
          status: 'queued',
        }),
      })

      if (response.ok) {
        const newTask = await response.json()
        setTasks((prev) => [newTask, ...prev])
        setForm({ title: '', agentId: 'sage', priority: 'medium', notes: '' })
        setShowForm(false)
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-96">
        <p className="text-cream-dim">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl text-cream tracking-wide">Tasks</h1>
          <p className="text-sm text-cream-dim mt-1">Agent task queue and status board</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl text-gold transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span className="text-sm tracking-wide">{showForm ? 'Cancel' : 'New Task'}</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-2 border border-surface-3 rounded-2xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-surface-3 border border-surface-3 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream-dim/40 outline-none transition-colors"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.agentId}
              onChange={(e) => setForm({ ...form, agentId: e.target.value })}
              className="bg-surface-3 border border-surface-3 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-cream outline-none transition-colors"
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
              className="bg-surface-3 border border-surface-3 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-cream outline-none transition-colors"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={3}
            className="w-full bg-surface-3 border border-surface-3 focus:border-gold/50 rounded-xl px-4 py-3 text-sm text-cream placeholder-cream-dim/40 outline-none transition-colors resize-none"
          />
          <button
            onClick={addTask}
            className="w-full bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-xl py-3 text-gold font-medium transition-colors"
          >
            Create Task
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key)
          return (
            <div key={col.key} className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-[0.18em] uppercase text-gold font-semibold">
                  {col.label}
                </p>
                <span className="text-xs text-cream-dim">{colTasks.length}</span>
              </div>
              <div className="space-y-3">
                {colTasks.length === 0 ? (
                  <div className="bg-surface-2 border border-surface-3 rounded-xl p-6 text-center">
                    <p className="text-xs text-cream-dim/40">No tasks</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onMove={moveTask} />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
