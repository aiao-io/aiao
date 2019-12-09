import { resolve } from 'path';

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'aiao-elements',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    }
  ],
  copy: [
    {
      src: resolve(__dirname, '../../', 'node_modules/@ionic/core'),
      dest: resolve(__dirname, 'vendors/ionic')
    },
    {
      src: resolve(__dirname, '../../', 'node_modules/monaco-editor/dev'),
      dest: resolve(__dirname, 'src/lib/components/code-editor/assets/monaco')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
