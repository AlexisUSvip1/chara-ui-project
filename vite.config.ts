// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: { // Configuración específica de Vitest
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts', // Asegúrate de que la ruta esté bien
    exclude: [...configDefaults.exclude], // Para omitir algunos archivos de prueba, si es necesario
  },
});
