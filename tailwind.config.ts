import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kako: {
          black: '#0a0a0a',
          dark: '#121212',
          card: '#1a1a1a',
          border: '#2a2a2a',
          muted: '#888888',
          white: '#f5f5f5',
          accent: '#ff2d55',
          neon: '#39ff14',
          electric: '#00f0ff',
        },
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%': { textShadow: '0 0 4px #ff2d55, 0 0 11px #ff2d55' },
          '100%': { textShadow: '0 0 8px #ff2d55, 0 0 20px #ff2d55, 0 0 40px #ff2d55' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
