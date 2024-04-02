import { defineConfig } from '@pandacss/dev'
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    '@park-ui/panda-preset',
    createPreset({
      accentColor: 'amber',
      grayColor: 'sand',
      borderRadius: 'md',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  strictTokens: true,
  jsxFramework: 'react',
  outdir: 'styled-system',

  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },

  // Useful for theme customization
  theme: {
    extend: {
      layerStyles: {},

      keyframes: {
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
          },
        },
      },

      tokens: {
        borders: {
          _debug: {
            value: '1px solid gray',
          },
        },
        sizes: {
          fixed_flex: {
            value: '1 1 0',
          },
        },
        animations: {
          reveal: {
            value: 'fadein 100ms',
          },
        },

        borderWidths: {
          thin: { value: '1px' },
          thick: { value: '2px' },
          medium: { value: '1.5px' },
        },
      },
    },
  },
})
