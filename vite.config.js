import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Forma segura de detectar modo sin usar process ni import.meta.env directamente
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
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
  }
})
