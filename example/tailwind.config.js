/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#212121',
        success: '#45C85A',
        error: '#C84545'
      }
    }
  },
  plugins: []
}

module.exports = tailwindConfig
