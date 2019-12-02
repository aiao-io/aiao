import { resolve } from 'path';
import { cwd } from 'process';

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-library-demo',
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
      src: resolve(cwd(), 'node_modules/@ionic/core'),
      dest: resolve(cwd(), 'apps/stencil-library-demo/vendors/ionic')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
