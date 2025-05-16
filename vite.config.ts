import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': '/src',  // This will make "@/lib/utils" point to the "src/lib/utils" file
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          if (id.includes('node_modules/react-icons') || 
              id.includes('node_modules/react-slick') ||
              id.includes('node_modules/slick-carousel')) {
            return 'ui-vendor';
          }
          if (id.includes('node_modules/aos') || 
              id.includes('node_modules/react-lottie')) {
            return 'animation-vendor';
          }
        }
      }
    }
  }
})
