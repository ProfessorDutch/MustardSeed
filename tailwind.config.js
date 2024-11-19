/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        patriot: {
          navy: '#2A3E55',
          red: '#A94442',
          cream: '#F5F2E9',
          blue: '#7A9BBA',
          gray: '#4A5568', // Updated to a darker shade
          crimson: '#8B3635'
        }
      },
      fontSize: {
        'senior': '1.25rem',
        'senior-lg': '1.5rem',
        'senior-xl': '2rem',
        'senior-2xl': '2.5rem',
      }
    },
  },
  plugins: [],
};