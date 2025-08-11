import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuename from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-music/', // 关键：GitHub Pages 子路径
  plugins: [
    vue(),
    vuename()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
