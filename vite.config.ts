import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Aumentamos el límite de advertencia de tamaño de chunk para mayor claridad
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        // Estrategia granular de manualChunks para fragmentar el archivo main-xxx.js
        manualChunks(id) {
          // Separar dependencias de terceros de node_modules
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react-core';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-google-ai';
            }
            return 'vendor-libs';
          }
          
          // Separar componentes de la UI para reducir el peso del punto de entrada principal
          if (id.includes('/components/')) {
            // Podríamos ser aún más específicos si fuera necesario, e.g., 'ui-forms', 'ui-layout'
            return 'app-ui-components';
          }
          
          // Separar las constantes (traducciones y textos legales) que suelen ser pesadas
          if (id.includes('/constants/')) {
            return 'app-data-constants';
          }

          // Los servicios de lógica de negocio (como geminiService) también pueden ir en su propio chunk
          if (id.includes('/services/')) {
            return 'app-services';
          }
        },
      },
    },
  },
});