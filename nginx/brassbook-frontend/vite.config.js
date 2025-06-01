import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg']
  },
  build: {
    sourcemap: true, // Enable source maps
  },
  assetsInclude: ['**/*.wasm']
})