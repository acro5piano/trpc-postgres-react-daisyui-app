/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    prefix: 'da-', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  },
}
