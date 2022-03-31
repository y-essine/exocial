import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    proxy: {'/api': 'http://localhost:3000'}
  },
  
})



