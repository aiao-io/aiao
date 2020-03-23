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
  tsconfig: 'tsconfig.json',
  enableCache: true,
  globalScript: 'src/lib/global/global.ts'
};
