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
    // {
    //   type: 'docs-readme'
    // }
  ],
  copy: [
    {
      src: resolve(__dirname, '../../', 'node_modules/@ionic/core'),
      dest: resolve(__dirname, 'vendors/ionic')
    },
    {
      src: resolve(__dirname, '../../', 'node_modules/monaco-editor/min'),
      dest: resolve(__dirname, 'src/lib/components/code-editor/assets/monaco')
    }
  ],
  bundles: [
    { components: ['aiao-elements-view'] },
    { components: ['aiao-elements-form'] },
    { components: ['aiao-elements-editor'] },
    { components: ['aiao-img'] }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
