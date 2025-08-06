/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandBlue: '#002D72',   // ← changed
        brandLight: '#f0f4f8',  // ← optional

        text: {
          DEFAULT: '#212529',
          inverted: '#ffffff',
          muted: '#6c757d',
        },
        bg: {
          DEFAULT: '#ffffff',
          dark: '#2e2e2e',
        },
        border: {
          light: '#ccc',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        serif: ['Roboto Slab', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
