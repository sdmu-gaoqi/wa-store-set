/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#585eaa',
        fontPrimary: '#6a6d82'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.table-btn': {
          marginRight: '16px',
          display: 'block',
          userSelect: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#585eaa',
          '&:hover': {
            opacity: '0.6'
          }
        },
        '.table-btn-danger': {
          marginRight: '16px',
          display: 'block',
          color: 'red',
          userSelect: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          '&:hover': {
            color: 'red',
            opacity: '0.6'
          }
        },
        '.last': {
          marginRight: 0,
          paddingRight: 0
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
