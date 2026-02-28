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
        sans: ['Rajdhani', 'Arial', 'sans-serif'],
        tactical: ['Rajdhani', 'Arial', 'sans-serif'],
        display: ['Orbitron', 'Arial', 'sans-serif'],
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
        // Free Fire theme tokens
        ff: {
          primary: 'oklch(0.72 0.19 42)',
          'primary-bright': 'oklch(0.82 0.22 42)',
          gold: 'oklch(0.82 0.18 80)',
          'gold-bright': 'oklch(0.90 0.20 85)',
          red: 'oklch(0.58 0.22 25)',
          dark: 'oklch(0.08 0.01 30)',
          surface: 'oklch(0.11 0.015 30)',
          'surface-2': 'oklch(0.14 0.02 30)',
          border: 'oklch(0.22 0.03 35)',
          text: 'oklch(0.92 0.04 60)',
          'text-muted': 'oklch(0.55 0.05 50)',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0,0,0,0.05)',
        'ff': '0 0 15px oklch(0.72 0.19 42 / 0.3), 0 0 30px oklch(0.72 0.19 42 / 0.1)',
        'ff-lg': '0 0 30px oklch(0.72 0.19 42 / 0.4), 0 0 60px oklch(0.72 0.19 42 / 0.15)',
        'ff-gold': '0 0 15px oklch(0.82 0.18 80 / 0.3), 0 0 30px oklch(0.82 0.18 80 / 0.1)',
        'ff-gold-lg': '0 0 30px oklch(0.82 0.18 80 / 0.5), 0 0 60px oklch(0.82 0.18 80 / 0.2)',
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
        'ff-pulse': {
          '0%, 100%': { boxShadow: '0 0 6px oklch(0.72 0.19 42 / 0.4)' },
          '50%': { boxShadow: '0 0 18px oklch(0.72 0.19 42 / 0.8), 0 0 30px oklch(0.72 0.19 42 / 0.3)' }
        },
        'ff-pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 6px oklch(0.82 0.18 80 / 0.4)' },
          '50%': { boxShadow: '0 0 18px oklch(0.82 0.18 80 / 0.8), 0 0 30px oklch(0.82 0.18 80 / 0.3)' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ff-pulse': 'ff-pulse 2s ease-in-out infinite',
        'ff-pulse-gold': 'ff-pulse-gold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      }
    }
  },
  plugins: [typography, containerQueries, animate]
};
