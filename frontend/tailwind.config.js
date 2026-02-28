import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'Courier', 'monospace'],
        terminal: ['"Share Tech Mono"', '"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        border: 'oklch(var(--border))',
        input: 'oklch(var(--input))',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        background: 'oklch(var(--background))',
        foreground: 'oklch(var(--foreground))',
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'oklch(var(--popover))',
          foreground: 'oklch(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'oklch(var(--card))',
          foreground: 'oklch(var(--card-foreground))'
        },
        chart: {
          1: 'oklch(var(--chart-1))',
          2: 'oklch(var(--chart-2))',
          3: 'oklch(var(--chart-3))',
          4: 'oklch(var(--chart-4))',
          5: 'oklch(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'oklch(var(--sidebar))',
          foreground: 'oklch(var(--sidebar-foreground))',
          primary: 'oklch(var(--sidebar-primary))',
          'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
          accent: 'oklch(var(--sidebar-accent))',
          'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
          border: 'oklch(var(--sidebar-border))',
          ring: 'oklch(var(--sidebar-ring))'
        },
        // Hacker theme tokens
        terminal: {
          green: 'oklch(0.85 0.22 145)',
          'green-dim': 'oklch(0.55 0.15 145)',
          'green-bright': 'oklch(0.95 0.25 145)',
          bg: 'oklch(0.06 0.015 145)',
          surface: 'oklch(0.1 0.025 145)',
          border: 'oklch(0.25 0.08 145)',
          red: 'oklch(0.6 0.22 25)',
          yellow: 'oklch(0.82 0.18 95)',
          cyan: 'oklch(0.8 0.15 200)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        'terminal': '0 0 15px oklch(0.85 0.22 145 / 0.3), 0 0 30px oklch(0.85 0.22 145 / 0.1)',
        'terminal-lg': '0 0 30px oklch(0.85 0.22 145 / 0.4), 0 0 60px oklch(0.85 0.22 145 / 0.15)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        'glitch': {
          '0%, 90%, 100%': { transform: 'translate(0)', filter: 'none' },
          '91%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '93%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(-90deg)' },
          '95%': { transform: 'translate(-1px, 2px)', filter: 'none' },
        },
        'blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' }
        },
        'flicker': {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.6' },
          '99%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px oklch(0.85 0.22 145 / 0.3)' },
          '50%': { boxShadow: '0 0 20px oklch(0.85 0.22 145 / 0.6), 0 0 40px oklch(0.85 0.22 145 / 0.2)' }
        },
        'scan-line': {
          '0%': { top: '-10%' },
          '100%': { top: '110%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch': 'glitch 8s infinite',
        'blink': 'blink 1s step-end infinite',
        'flicker': 'flicker 6s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 4s linear infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
