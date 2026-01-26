import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/[\\/]node_modules[\\/]/.test(id)) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lottie-react')) return 'vendor-lottie';
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('daisyui')) return 'vendor-daisyui';
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0'
  }
})
