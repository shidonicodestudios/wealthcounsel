import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0b0b',
        surface: '#161010',
        'surface-2': '#1e1616',
        'surface-3': '#261c1c',
        brown: {
          DEFAULT: '#4a2c2a',
          light: '#6b3f3c',
          dark: '#2e1a18',
        },
        olive: {
          DEFAULT: '#4a5240',
          light: '#636e56',
          dark: '#2e3328',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c26a',
          dark: '#a07a28',
          muted: '#8a6d35',
        },
        pink: {
          soft: '#f2d4d4',
          muted: '#c4a0a0',
        },
        cream: '#f5ede0',
        'cream-muted': '#c4b49a',
        'cream-dim': '#7a6a58',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Syne', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 6px rgba(201,168,76,0)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
