/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        // 브랜드 가이드: 2xl 라운드 = 1.5rem
        '2xl': '1.5rem',
      },
      colors: {
        beautia: {
          pink: '#F9B4C9',
          mint: '#B6E6D8',
          lavender: '#B9B7F5',
        },
      },
      backgroundImage: {
        'beautia-gradient': 'linear-gradient(90deg, #F9B4C9 0%, #B6E6D8 45%, #B9B7F5 100%)',
      },
      boxShadow: {
        'quiet-xl': '0 30px 80px -50px rgba(17, 24, 39, 0.40)',
        'quiet-md': '0 18px 55px -45px rgba(17, 24, 39, 0.35)',
      },
      keyframes: {
        'aurora-drift': {
          '0%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
          '50%': { transform: 'translate3d(6%, 4%, 0) scale(1.05)' },
          '100%': { transform: 'translate3d(-6%, -4%, 0) scale(1)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
      },
      animation: {
        aurora: 'aurora-drift 12s ease-in-out infinite',
        'float-soft': 'float-soft 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

