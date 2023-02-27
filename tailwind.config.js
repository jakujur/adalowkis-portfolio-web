/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '3/4': '75%',
      },
      maxHeight: {
        '1/2': '50%',
        '3/4': '75%',
      },
    },
  },
  plugins: [],
};
