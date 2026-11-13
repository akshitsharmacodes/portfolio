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
            manualChunks: {
              'vendor-framer': ['framer-motion'],
              'vendor-react': ['react', 'react-dom'],
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
