/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula'],
  },
};
