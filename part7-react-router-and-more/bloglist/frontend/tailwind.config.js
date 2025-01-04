/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        back: '#111827',
        secondary: '#00425b',
        accent:'#82d47c',
        accent2:'#f9f871'
      },
    },
  },
  plugins: [],
}