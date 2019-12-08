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
    },
    {
      type: 'docs-readme'
    }
  ],
  copy: [
    {
      src: resolve(__dirname, '../../', 'node_modules/@ionic/core'),
      dest: resolve(__dirname, '../../', 'libs/elements/vendors/ionic')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
