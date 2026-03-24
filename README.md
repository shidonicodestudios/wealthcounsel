# The Wealth Counsel — Command Room

Private dashboard for The Wealth Counsel AI agent team.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS with custom theme
- TypeScript
- Fonts: Cormorant Garamond + Syne (Google Fonts)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local

# 3. Fill in .env.local with your values

# 4. Run development server
npm run dev

# 5. Open http://localhost:3000
```

## Project Structure

```
app/
  dashboard/     → Overview page
  agents/        → Full agent roster
  tasks/         → Kanban task board
  calendar/      → Cron job schedule
  structure/     → Org chart / hierarchy
  log/           → Activity log feed
components/
  Sidebar.tsx    → Navigation
  AgentCard.tsx  → Agent card with toggle
  AgentModal.tsx → Agent detail + command input
  StatusBadge.tsx → Status indicator
data/
  agents.ts      → Agent definitions
  index.ts       → Tasks, cron jobs, log entries
types/
  index.ts       → All TypeScript types
public/
  images/        → Drop agent photos here
    sage.jpg
    ingrid.jpg
    margo.jpg
    vesper.jpg
    wren.jpg
```

## Agent Photos

Drop the generated portrait images into `/public/images/` with the exact filenames above. They will render automatically in all agent cards, modals, and the org chart.

## For Sage — Configuration Checklist

All connection points are marked with `// TODO (Sage):` comments throughout the codebase. Key tasks:

1. **Agent API endpoints** — fill in `.env.local` with each agent's VPS port/route
2. **Command input** — wire `AgentModal.tsx` send button to each agent's actual API
3. **Live log feed** — connect `app/log/page.tsx` to a WebSocket endpoint
4. **Cron config** — link calendar entries to live cron state
5. **Auth** — optionally add NextAuth to lock the dashboard

Search the codebase for `TODO (Sage)` to find every integration point.

## Deployment (VPS)

```bash
npm run build
npm start
# Runs on port 3000 by default
# Use nginx or Caddy as a reverse proxy
```
