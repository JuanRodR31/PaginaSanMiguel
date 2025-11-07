import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno del archivo .env
  const env = loadEnv(mode, process.cwd(), '');
  
  // Obtener la URL de la API desde las variables de entorno
  const apiUrl = env.VITE_API_URL || 'http://localhost:8080';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false, 
        },
      },
    },
  };
});
