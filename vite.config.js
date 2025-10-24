import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detecta si está en modo producción usando las variables de Vite
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/bancodemo/' : '/',
  server: {
    host: '0.0.0.0', // accesible desde fuera del contenedor
    port: 5173,
    allowedHosts: [
      'oscarpalomino.dev',
      'www.oscarpalomino.dev'
    ],
  },
}))
