import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src')
    }
  },
  server: {
    port: 9911,
    proxy: {
      '/api': {
        target: 'https://dog.ceo',
        changeOrigin: true
      },
      '/catapi': {
        target: 'https://api.thecatapi.com/v1',
        changeOrigin: true,
        rewrite: (pathName) => pathName.replace(/^\/catapi/, '')
      },
      '/foxapi': {
        target: 'https://randomfox.ca',
        changeOrigin: true,
        rewrite: (pathName) => pathName.replace(/^\/foxapi/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `
          @import "${path.resolve(rootDir, 'src/assets/styles/theme.styl')}"
          @import "${path.resolve(rootDir, 'src/assets/styles/var/index.styl')}"
        `
      }
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  }
})
