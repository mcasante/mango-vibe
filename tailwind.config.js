import plugin from 'tailwindcss/plugin'
// import { flattenColorPalette } from 'tailwindcss/lib/utils'
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette"

const transform = `translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y))
rotate(var(--tw-rotate))
skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`

module.exports = {
  theme: {
    tabSize: {
      1: '1',
      2: '2',
      4: '4',
      8: '8',
    }
  },
  plugins: [
    function ({ matchUtilities, addUtilities, theme }) {
      matchUtilities(
        {
          'text-border': (value) => ({
            '--text-border-offset': '1px',
            '--text-border-color': value,
            'text-shadow': `
              var(--text-border-offset) 0 var(--text-border-color),
              calc(-1*var(--text-border-offset)) 0 var(--text-border-color),
              0 var(--text-border-offset) var(--text-border-color),
              0 calc(-1*var(--text-border-offset)) var(--text-border-color),
              var(--text-border-offset) var(--text-border-offset) var(--text-border-color),
              calc(-1*var(--text-border-offset)) calc(-1*var(--text-border-offset)) var(--text-border-color),
              var(--text-border-offset) calc(-1*var(--text-border-offset)) var(--text-border-color),
              calc(-1*var(--text-border-offset)) var(--text-border-offset) var(--text-border-color)
            `,
          }),
          'brutal-shadow': (value) => ({
            '--brutal-shadow-color': value,
          })
        },
        {
          values: flattenColorPalette(theme("colors")),
          type: "color"
        }
      )

      matchUtilities({
        'brutal-border': (value) => ({
          '--brutal-border': value,
        }),
        'text-border': (value) => ({
          '--text-border-offset': value
        })
      })

      addUtilities({
        '.brutal-translate': {
          '--tw-translate-x': 'var(--brutal-shadow-size)',
          '--tw-translate-y': 'var(--brutal-shadow-size)',
          'transform': transform,
        },
        '.brutal--translate': {
          '--tw-translate-x': 'calc(-1*var(--brutal-shadow-size))',
          '--tw-translate-y': 'calc(-1*var(--brutal-shadow-size))',
          'transform': transform,
        },
        '.brutal': {
          '--black': '#000',
          '--brutal-border-color': 'var(--black)',
          '--brutal-shadow-color': 'var(--brutal-border-color)',
          '--brutal-border-size': '.2rem',
          '--brutal-shadow-size': '.25rem',
          '--brutal-border': 'var(--brutal-border-size) solid var(--brutal-border-color)',
          '--brutal-shadow': 'var(--brutal-shadow-size) var(--brutal-shadow-size) var(--brutal-shadow-color)',
        
          '--text-border-color': 'var(--black)',
          '--text-border-size': '.2rem',

          border: 'var(--brutal-border)',
          'box-shadow': 'var(--brutal-shadow)',
        },
      },
      { variants: ['responsive', 'hover', 'active']})
    }
  ]
}