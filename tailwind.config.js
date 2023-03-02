/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '770px',
      md: '990px',
      lg: '1220px',
    },
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
