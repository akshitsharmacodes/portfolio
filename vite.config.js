import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function surgeSpaPlugin() {
  return {
    name: 'surge-spa',
    closeBundle() {
      const distIndex = path.resolve(__dirname, 'dist', 'index.html');
      const dist200 = path.resolve(__dirname, 'dist', '200.html');
      if (fs.existsSync(distIndex)) {
        fs.copyFileSync(distIndex, dist200);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), surgeSpaPlugin()],
  base: './', // Ensures asset paths resolve cleanly on Vercel, Netlify, Surge, GitHub Pages, or custom domains
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
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
});
