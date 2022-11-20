import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/styles/global.scss';`,
      },
    },
    modules: {
      generateScopedName: '[name]__[local]--[hash:base64:5]',
    },
  },
});
