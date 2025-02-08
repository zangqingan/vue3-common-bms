import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), eslint()],
})
