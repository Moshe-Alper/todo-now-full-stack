/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2463eb',
          hover: '#1d4ed8',
        },
        success: {
          DEFAULT: '#10b981',
        },
      },
    },
  },
  plugins: [],
}

