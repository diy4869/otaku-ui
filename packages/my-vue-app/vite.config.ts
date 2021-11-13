import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from 'vite-plugin-mdx'
import md from './plugins/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx()
  ]
})
