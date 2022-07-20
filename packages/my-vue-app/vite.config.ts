import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import md from './plugins/index.ts'
import inspect from 'vite-plugin-inspect'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    inspect(),
    react({
      include: [/\.(ts|tsx)$/, /\.md$/],
    }),
    md({
      include: /\.md$/
    })
  ]
})
