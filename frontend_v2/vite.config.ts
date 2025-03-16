import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'crypto';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global.crypto': crypto, // создаем глобальную переменную для crypto
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'global': 'window', // возможно это тоже поможет для работы в браузере
  },
  build: {
    target: 'esnext', // указываем современный таргет для сборки
  },
})
