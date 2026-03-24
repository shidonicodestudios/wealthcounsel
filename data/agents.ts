import { Agent } from '@/types'

export const agents: Agent[] = [
  {
    id: 'sage',
    name: 'Sage',
    title: 'Chief Intelligence Officer',
    role: 'Hub Agent',
    description:
      'Sage is the command center of The Wealth Counsel. She orchestrates the full team, synthesizes macro intelligence, generates thesis configurations, and ensures all sub-agents are aligned with the current market strategy. Every decision flows through Sage.',
    photo: '/images/sage.png',
    status: 'active',
    currentTask: 'Analyzing Gulf Shipping macro signals for thesis update',
    lastAction: 'Generated Q2 config for Margo — 14m ago',
    accentColor: '#c9a84c',
    isHub: true,
  },
  {
    id: 'ingrid',
    name: 'Ingrid',
    title: 'Meme Coin Base Trader',
    role: 'Sub-Agent',
    description:
      'Ingrid monitors Base chain memecoin momentum, volume anomalies, and social signal velocity. She executes fast entries and exits on high-conviction setups, gated by Polymarket probability thresholds.',
    photo: '/images/ingrid.png',
    status: 'running',
    currentTask: 'Scanning Base chain for breakout momentum signals',
    lastAction: 'Flagged DEGEN volume spike — 3m ago',
    accentColor: '#c9a84c',
    isHub: false,
  },
  {
    id: 'margo',
    name: 'Margo',
    title: 'Equity/Options + Polymarket Trader',
    role: 'Sub-Agent',
    description:
      'Margo manages equity and options positions alongside Polymarket prediction market trades. She reads the options flow, tracks IV percentile, and uses Polymarket as a signal confirmation layer before entering.',
    photo: '/images/margo.jpeg',
    status: 'active',
    currentTask: 'Monitoring SPY options flow — elevated IV environment',
    lastAction: 'Opened TSLA call spread position — 32m ago',
    accentColor: '#4a5240',
    isHub: false,
  },
  {
    id: 'vesper',
    name: 'Vesper',
    title: 'AXD Portfolio Strategist',
    role: 'Sub-Agent',
    description:
      'Vesper manages portfolio-level strategy and allocation across all active positions. She monitors drawdown thresholds, rebalances exposure, and surfaces risk-adjusted recommendations to the team.',
    photo: '/images/vesper.jpeg',
    status: 'idle',
    currentTask: 'Awaiting next rebalance trigger — portfolio within bounds',
    lastAction: 'Rebalanced crypto allocation to 18% — 2h ago',
    accentColor: '#c9a84c',
    isHub: false,
  },
  {
    id: 'wren',
    name: 'Wren',
    title: 'AXD Market Intelligence Analyst',
    role: 'Sub-Agent',
    description:
      'Wren is the team\'s eyes on the macro and micro environment. She processes news feeds, on-chain data, social sentiment, and geopolitical signals — surfacing intelligence to Sage before the market prices it in.',
    photo: '/images/wren.jpeg',
    status: 'running',
    currentTask: 'Processing overnight Asia market session data',
    lastAction: 'Sent macro brief to Sage — 8m ago',
    accentColor: '#8a3a2a',
    isHub: false,
  },
]

export const getAgent = (id: string) => agents.find((a) => a.id === id)
