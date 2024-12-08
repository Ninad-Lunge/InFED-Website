/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        marqueeReverse: 'marqueeReverse 30s linear infinite',
      },
      colors: {
        customYellow: {
          100: '#FFDB9C',
          200: '#FFB347',
          300: '#F7A221',
          400: '#D7891E',
          500: '#B5711A',
        },
      },
    },
  },
  plugins: [],
};