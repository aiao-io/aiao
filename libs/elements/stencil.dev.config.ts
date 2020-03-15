import { join } from 'path';

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'aiao-elements',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-hydrate-script'
    }
  ],
  copy: [
    {
      src: join(__dirname, '../../', 'dist/libs/image-storage'),
      dest: join(__dirname, 'vendors/image-storage')
    },
    {
      src: join(__dirname, '../../', 'node_modules/monaco-editor/dev'),
      dest: join(__dirname, 'vendors/monaco-editor')
    },
    {
      src: join(__dirname, '../../', 'node_modules/ionicons'),
      dest: join(__dirname, 'vendors/ionicons')
    },
    {
      src: join(__dirname, '../../', 'node_modules/@ionic/core'),
      dest: join(__dirname, 'vendors/ionic')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
