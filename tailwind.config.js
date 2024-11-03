/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121214',
          800: '#202024',
          700: '#29292E',
          400: '#7C7C8A',
        },
        red: {
          500: '#DC2626',
          600: '#B91C1C',
        },
      },
    },
  },
  plugins: [],
}