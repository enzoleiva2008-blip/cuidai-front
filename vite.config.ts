import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// React + Tailwind CSS (v4, via plugin oficial do Vite)
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
