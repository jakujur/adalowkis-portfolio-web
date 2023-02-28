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
      xs: '460px',
      sm: '770px',
      md: '1138px',
      lg: '1394px',
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
