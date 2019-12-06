import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'elements',
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
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
