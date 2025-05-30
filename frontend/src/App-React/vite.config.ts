/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Esto hace que Vite escuche en todas las interfaces de red
    port: 3000,        // Asegúrate de que el puerto sea 3000
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
  allowedHosts: ['blfcts-appweb-iberasi-dev.azurewebsites.net'] 
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
});