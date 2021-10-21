import { join } from 'lodash';
import { cwd } from 'process';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: join(cwd(), 'dist/apps/dev-elements-vue'),
    emptyOutDir: true
  }
});
