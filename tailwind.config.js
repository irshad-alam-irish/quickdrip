/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
      },
      colors: {
        primary: '#0f172a',
        secondary: '#64748b',
        accent: '#3b82f6',
      }
    },
  },
  plugins: [],
}
