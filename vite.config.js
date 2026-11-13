import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ isSsrBuild }) => ({
  // No SPA catch-all (e.g. Surge's 200.html): every real route is pre-rendered, unknown URLs must 404
  plugins: [react()],
  // Absolute asset paths: pages live at nested URLs (/services/seo, /work/matcha-ai)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Vendor chunks for the browser build only (the SSR pre-render bundle keeps deps external)
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/framer-motion')) return 'vendor-framer';
              if (id.includes('node_modules/lucide-react')) return 'vendor-icons';
              if (id.includes('node_modules/react-router')) return 'vendor-router';
              if (id.includes('node_modules/gsap')) return 'vendor-gsap';
              if (id.includes('node_modules/lenis')) return 'vendor-lenis';
            },
          },
        },
  },
  server: {
    port: 3001,
    strictPort: false,
    open: false,
    watch: {
      ignored: ['**/.claude/**', '**/temp-chrome/**', '**/.git/**'],
    },
  },
}));
