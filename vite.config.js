import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures asset paths resolve cleanly on Vercel, Netlify, GitHub Pages, or custom domains
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3001,
    strictPort: false,
    open: false,
    watch: {
      ignored: ['**/.claude/**', '**/temp-chrome/**', '**/.git/**'],
    },
  },
});
