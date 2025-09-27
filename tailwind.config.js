/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--color-bg))',
        fg: 'hsl(var(--color-fg))',
        accent: 'hsl(var(--color-accent))',
        surface: 'hsl(var(--color-surface))',
        'text-primary': 'hsl(var(--color-text-primary))',
        'text-secondary': 'hsl(var(--color-text-secondary))',
        primary: 'hsl(222, 88%, 57%)',
        'accent-pink': 'hsl(340, 90%, 60%)',
        'neon-green': '#00ff41',
        'cyber-purple': '#1a0d2e',
        'cyber-blue': '#16213e',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'cyber': '0px',
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(222, 15%, 20%, 0.12)',
        'neon': '0 0 20px rgba(0, 255, 65, 0.3)',
        'cyber': '0 0 30px rgba(0, 255, 65, 0.5)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 255, 65, 0.8)' },
        },
        'glow': {
          '0%': { textShadow: '0 0 10px rgba(0, 255, 65, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(0, 255, 65, 1)' },
        },
      },
    },
  },
  plugins: [],
};
