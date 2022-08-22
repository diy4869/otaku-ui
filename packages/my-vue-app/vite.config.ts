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
      'otaku-ui': path.resolve(__dirname, '../otaku-ui/'),
      'site-component': path.resolve(__dirname, './src/components'),
      '@docs': path.resolve(__dirname, './docs'),
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src/assets')
    }
  },
  server: {
    open: true
  },
  logLevel: 'silent',
  plugins: [
    inspect(),
    react({
      include: [/\.(ts|tsx)$/, /\.md$/],
    }),
    md()
  ]
})
