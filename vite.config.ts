import path from 'node:path'

import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      root: './',
    }),
  ],
  // resolve: {
  //   alias: {
  //     '~': path.resolve(__dirname, './src'),
  //     '@styled-system': path.resolve(__dirname, './styled-system'),
  //   },
  // },
})
