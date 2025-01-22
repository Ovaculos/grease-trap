import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'dotenv/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://${process.env.host}:${process.env.port}`,
        changeOrigin: true,
      }
    }
  }
})
