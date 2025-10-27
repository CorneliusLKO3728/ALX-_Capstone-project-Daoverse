import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('🚀 Vite config is loading!'); // Add this line

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://novels-api.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
});