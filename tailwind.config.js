/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#FF5400',
          hover: '#FF691E',
          active: '#EB4D00',
          dark: '#CC4300',
          light: '#FF7733',
          glow: 'rgba(255, 84, 0, 0.35)',
          muted: 'rgba(255, 84, 0, 0.12)',
        },
        two26: {
          canvas: '#F8EEE8',
          surface: '#FDF8F5',
          surfaceRaised: '#F3EEEB',
          ink: '#000000',
          body: '#333333',
          border: '#DAD1CC',
          accent: '#FF5400',
          neutral1: '#F9E2E1',
          neutral2: '#ECEAE5',
          link: '#0000EE',
        },
        dark: {
          DEFAULT: '#000000',
          950: '#000000',
          900: '#111113',
          850: '#18181B',
          800: '#27272A',
          700: '#3F3F46',
          600: '#52525B',
        },
        surface: {
          base: '#F8EEE8',
          card: '#FDF8F5',
          elevated: '#F3EEEB',
          border: '#DAD1CC',
          borderHover: 'rgba(255, 84, 0, 0.4)',
        }
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(255, 84, 0, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(255, 84, 0, 0.55)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-brand': 'radial-gradient(circle at center, rgba(255, 84, 0, 0.15) 0%, transparent 70%)',
        'hero-two26': 'linear-gradient(rgb(250, 227, 226) 73%, rgb(248, 238, 232))',
      }
    },
  },
  plugins: [],
}
