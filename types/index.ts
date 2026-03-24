export type AgentStatus = 'active' | 'idle' | 'running'

export interface Agent {
  id: string
  name: string
  title: string
  role: string
  description: string
  photo: string
  status: AgentStatus
  currentTask: string
  lastAction: string
  accentColor: string
  isHub: boolean
}

export type TaskStatus = 'queued' | 'in-progress' | 'complete'
export type TaskPriority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  agentId: string
  status: TaskStatus
  priority: TaskPriority
  notes: string
  createdAt: string
}

export interface CronJob {
  id: string
  name: string
  agentId: string
  schedule: string
  nextRun: string
  lastRun: string
  lastStatus: 'success' | 'failed' | 'pending'
}

export interface LogEntry {
  id: string
  timestamp: string
  agentId: string
  action: string
  status: 'success' | 'error' | 'info' | 'warning'
}
