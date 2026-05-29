import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B6E5A',
          hover: '#095C4B',
          soft: '#D9F0EA',
        },
        accent: {
          DEFAULT: '#E07B39',
          hover: '#C96A2F',
          soft: '#FBE8DA',
        },
        teal: {
          50: '#E8FAF5',
          100: '#BEF0E3',
          200: '#7DDDC6',
          300: '#3FC9A8',
          400: '#1AA888',
          500: '#0E8970',
          600: '#0B6E5A',
          700: '#095C41',
          800: '#063D2C',
          900: '#031F18',
        },
        amber: {
          100: '#FDECD5',
          200: '#FAD4A8',
          300: '#F7B87A',
          400: '#F09555',
          500: '#E07B39',
          600: '#C45F20',
          700: '#A84510',
          800: '#7A3009',
          900: '#4A1C05',
        },
        neutral: {
          0: '#F2F8F5',
          25: '#E2EBE7',
          50: '#C4D1CC',
          100: '#9AADA5',
          200: '#7A9187',
          300: '#5A6B63',
          400: '#3D5047',
          500: '#2D3C35',
          600: '#243029',
          700: '#1A2420',
          800: '#111714',
          900: '#0A100D',
          950: '#080D0B',
        },
        track: {
          heatshield: '#F05454',
          floodnet: '#3BA7D9',
          farmfuture: '#6EC14B',
          cleangrid: '#F5C842',
          waterwatch: '#5BA7F0',
          open: '#A78BFA',
        },
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'Instrument Sans', 'sans-serif'],
        body: ['Instrument Sans', 'DM Sans', 'sans-serif'],
        stat: ['Barlow Condensed', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.4s ease-out both',
        'fade-in': 'fadeIn 0.3s ease-out both',
        ticker: 'ticker 60s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'count-up': 'countUp 0.4s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(11, 110, 90, 0.20)' },
          '50%': { boxShadow: '0 0 40px rgba(224, 123, 57, 0.28)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;