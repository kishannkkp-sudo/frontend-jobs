/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(to bottom, #EFF6FF, #F3F4F6)',
      },
    },
  },
  plugins: [],
}