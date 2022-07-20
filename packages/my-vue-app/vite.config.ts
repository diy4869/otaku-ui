import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'
import md from './plugins/index'
import inspect from 'vite-plugin-inspect'
import path from 'path'

console.log( path.resolve(__dirname, './src/components'))

// process.exit()
// https://vitejs.dev/config/
export default defineConfig({
  // assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      'site-component': path.resolve(__dirname, './src/components'),
      '@docs': path.resolve(__dirname, './docs'),
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src/assets')
    }
  },
  plugins: [
    inspect(),
    react({
      include: [/\.(ts|tsx)$/, /\.md$/],
    }),
    md()
  ]
})
