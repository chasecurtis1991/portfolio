import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      animation: {
        'ping-large': 'ping-large 1s ease-in-out infinite',
        'move-left': 'move-left 1s linear infinite',
        'move-right': 'move-right 1s linear infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'shimmer-bg': 'shimmer-bg 8s linear infinite',
        'glow-x': 'glow-x 3s infinite',
        'glow-y': 'glow-y 3s infinite'
      },
      keyframes: {
        'ping-large': {
          '75%, 100%': {
            transform: 'scale(3)',
            opacity: '0',
          }
        },
        'move-left': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          }
        },
        'move-right': {
          '0%': {
            transform: 'translateX(-50%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          }
        },
        'glow-x': {
          '0%, 100%': { 'background-position': '200% 50%' },
          '50%': { 'background-position': '0% 50%' }
        },
        'glow-y': {
          '0%, 100%': { 'background-position': '50% 200%' },
          '50%': { 'background-position': '50% 0%' }
        },
        shimmer: {
          '0%': {
            'transform': 'translateX(-100%) translateY(-100%)',
          },
          '100%': {
            'transform': 'translateX(100%) translateY(100%)',
          },
        },
        'shimmer-bg': {
          '0%': {
            'transform': 'translate(0%, 0%)',
          },
          '100%': {
            'transform': 'translate(-66.67%, -66.67%)',
          },
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
