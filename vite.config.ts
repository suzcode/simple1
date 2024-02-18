import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './', // Set the base URL to match your Vite build output path
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': '/src', // Adjust the alias to match your project structure
    },
  },
});