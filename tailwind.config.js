/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0ECFE',
          100: '#D4C5FB',
          200: '#B89FF8',
          300: '#9C79F5',
          400: '#7E52F2',
          500: '#6C3EF4',
          600: '#5A32D0',
          700: '#4826AC',
          800: '#361A88',
          900: '#240E64',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
    },
  },
  plugins: [],
};
