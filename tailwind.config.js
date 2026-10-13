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
          DEFAULT: '#FC6603',
          hover: '#FF771E',
          active: '#E05300',
          dark: '#B84000',
          light: '#FF8833',
          glow: 'rgba(252, 102, 3, 0.35)',
          muted: 'rgba(252, 102, 3, 0.12)',
        },
        dark: {
          DEFAULT: '#060709',
          950: '#060709',
          900: '#0B0D13',
          850: '#10131C',
          800: '#161A26',
          700: '#23293D',
          600: '#343D56',
        },
        surface: {
          base: '#0B0D13',
          card: '#10131C',
          elevated: '#161A26',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(252, 102, 3, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Outfit', 'sans-serif'],
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
          '0%': { boxShadow: '0 0 15px rgba(252, 102, 3, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(252, 102, 3, 0.55)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'radial-brand': 'radial-gradient(circle at center, rgba(252, 102, 3, 0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
