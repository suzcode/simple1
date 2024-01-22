// import { fileURLToPath, URL } from 'node:url'
import { fileURLToPath } from 'url'; // Import fileURLToPath from the 'url' module

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
