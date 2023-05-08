import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:7182/"
    }
  }
});