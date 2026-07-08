/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#0B1120',
          panel: '#0F1B34',
          elevated: '#1B2B4D',
        },
        indigo: {
          brand: '#4C6FFF',
          soft: '#7B93FF',
        },
        ledger: {
          teal: '#00D4B5',
          amber: '#F5A623',
          red: '#FF5C6C',
        },
        ink: {
          DEFAULT: '#F5F7FF',
          muted: '#8A94B3',
          faint: '#5A6690',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        glow: '0 0 24px rgba(76, 111, 255, 0.35)',
        'glow-teal': '0 0 24px rgba(0, 212, 181, 0.35)',
      },
      backgroundImage: {
        'ledger-gradient': 'linear-gradient(135deg, #0B1120 0%, #101C3A 50%, #0B1120 100%)',
        'card-sheen': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
      },
      animation: {
        'ledger-trace': 'ledgerTrace 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 1.8s infinite',
      },
      keyframes: {
        ledgerTrace: {
          '0%, 100%': { opacity: 0.3, transform: 'scaleX(0.96)' },
          '50%': { opacity: 1, transform: 'scaleX(1)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
