import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",   // ye line tumhare deploy ke liye zaruri hai
  plugins: [react()],
})