import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-library-demo',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    }
  ],
  tsconfig: 'tsconfig.json'
};
