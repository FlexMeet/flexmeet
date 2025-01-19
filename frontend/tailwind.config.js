/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",             // Adjust based on your project structure
  ],
  theme: {
    extend: {
      textColor: {
        'default': 'black',
        'white': 'white',
        'tele': '#24A1DE'
      },
      colors: {
        'default': 'black',
        'white': 'white',
        'tele': '#24A1DE'
      },
    },
  },
  plugins: [],
};
