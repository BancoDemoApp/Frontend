import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_ENV === 'production' ? '/bancodemo/' : '/',
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