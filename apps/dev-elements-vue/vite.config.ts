import path from 'path';
import { defineConfig } from 'vite';

import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  assetsInclude: /\.(pdf|jpg|png|svg)$/,
  resolve: {
    alias: {
      '@assets/': `${path.resolve(__dirname, './src/assets')}/`,
      '@app/': `${path.resolve(__dirname, './src/app')}/`,
      '@public/': `${path.resolve(__dirname, './src/public')}/`
    }
  },
  publicDir: path.resolve(__dirname, './src/public'),
  plugins: [Vue()]
});
