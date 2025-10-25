import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta entorno sin usar process directamente
const isProduction = (import.meta.env.NODE_ENV === 'production')

export default defineConfig({
  plugins: [react()],
  base: isProduction ? '/bancodemo/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'oscarpalomino.dev',
      'www.oscarpalomino.dev'
    ],
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'oscarpalomino.dev',
      'www.oscarpalomino.dev'
    ],
  },
})
