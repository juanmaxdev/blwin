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
    allowedHosts: ['ble-appweb-win-dev-caa4ajb6hdargkb7.westeurope-01.azurewebsites.net', 'ble-appweb-win-pre-fkbhc3budqbcf9ez.westeurope-01.azurewebsites.net', 'ble-appweb-win-pro-ckccb4hqb7c9g2ej.westeurope-01.azurewebsites.net']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
});