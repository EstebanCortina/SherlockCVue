import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['pdfjs-dist'], // optionally specify dependency name
    esbuildOptions: {
      supported: {
        'top-level-await': true
      }
    }
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: '',
    minify: 'terser',
    sourcemap: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
