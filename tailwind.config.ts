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
          DEFAULT: '#6D6ABB',
          hover: '#564FA8',
          soft: '#E8E7FB',
        },
        accent: {
          DEFAULT: '#F4643D',
          hover: '#D95532',
          soft: '#FFE2DB',
        },
        secondary: {
          DEFAULT: '#365B78',
          hover: '#2C4A62',
          soft: '#DCE8F1',
        },
        violet: {
          100: '#E8E7FB',
          200: '#C9C7F2',
          300: '#A6A3E7',
          400: '#8480D0',
          500: '#6D6ABB',
          600: '#564FA8',
          700: '#474193',
          800: '#3A357A',
          900: '#2D2861',
        },
        teal: {
          100: '#DCE8F1',
          200: '#B4C8DA',
          300: '#89A6BE',
          400: '#5A7E9A',
          500: '#365B78',
          600: '#2C4A62',
          700: '#22394C',
          800: '#1A2E3E',
          900: '#0F1F2B',
        },
        ember: {
          100: '#FFE2DB',
          200: '#FFB8A8',
          300: '#FF8C6F',
          400: '#F4643D',
          500: '#E55A35',
          600: '#D95532',
          700: '#B94727',
          800: '#9A3A1F',
          900: '#7A2E16',
        },
        neutral: {
          0: '#F7F9FC',
          25: '#EEF3F8',
          50: '#D9E2EC',
          100: '#C0CBD7',
          200: '#A0B2C2',
          300: '#8095A8',
          400: '#60758B',
          500: '#516173',
          600: '#3D4A59',
          700: '#2A3848',
          800: '#1B2A3C',
          900: '#152231',
          950: '#0F1720',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(109, 106, 187, 0.20)' },
          '50%': { boxShadow: '0 0 40px rgba(244, 100, 61, 0.28)' },
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
