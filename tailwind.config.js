/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#E8C97A',
          400: '#D4A853',
          500: '#C6963A',
          600: '#B07E28',
          700: '#8C6420',
        },
        charcoal: {
          50:  '#F7F5F3',
          100: '#EDE9E4',
          200: '#D4CCC4',
          800: '#2A2520',
          900: '#1A1612',
          950: '#0F0D0A',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
    },
  },
  plugins: [],
};
