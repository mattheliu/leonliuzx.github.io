import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.md'],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // 给 markdown 文件生成哈希名称
          if (assetInfo.name.endsWith('.md')) {
            return 'assets/articles/[hash].txt'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
})
