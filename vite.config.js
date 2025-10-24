import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProduction = (process.env.VITE_ENV || 'development') === 'production'

export default defineConfig({
  plugins: [react()],
  base: isProduction ? '/bancodemo/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['oscarpalomino.dev', 'localhost', '127.0.0.1'],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['oscarpalomino.dev', 'localhost', '127.0.0.1'],
  },
})
