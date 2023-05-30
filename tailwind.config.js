const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './public/index.html', 
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'current',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      yellow: colors.yellow,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      green: colors.green,
      blueGray: colors.blueGray,
      lime: colors.lime
    },
    fontFamily: {
      'sans': ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
    },
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive','hover','focus','active'],
    extend: {},
  },
  plugins: [],
}
