const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        creme: '#F5EDE4',
        nude: '#E8D5C4',
        rose: '#D4A092',
        caramel: '#A67B5B',
        gold: '#C9A96E',
        dark: '#4A3728',
        darker: '#2C1810',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
        italiana: ['var(--font-italiana)', 'var(--font-cormorant)', ...fontFamily.serif],
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      letterSpacing: {
        widest2: '0.3em',
        widest3: '0.5em',
      },
    },
  },
  plugins: [],
};
