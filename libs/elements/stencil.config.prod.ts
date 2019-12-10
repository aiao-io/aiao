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
      type: 'angular',
      componentCorePackage: '@aiao/elements',
      directivesProxyFile: resolve(__dirname, '../elements-angular/src/lib/directives/proxies.ts'),
      directivesUtilsFile: resolve(__dirname, '../elements-angular/src/lib/directives/proxies-utils.ts'),
      directivesArrayFile: resolve(__dirname, '../elements-angular/src/lib/directives/proxies-list.txt'),
      excludeComponents: []
    }
    // {
    //   type: 'docs-readme'
    // }
  ],
  copy: [
    {
      src: resolve(__dirname, '../../', 'node_modules/monaco-editor/min'),
      dest: resolve(__dirname, 'src/lib/components/code-editor/assets/monaco')
    }
  ],
  bundles: [
    { components: ['aiao-code-editor'] },
    { components: ['aiao-elements-editor', 'aiao-elements-editor-preview'] },
    { components: ['aiao-elements-form'] },
    { components: ['aiao-elements-view'] },
    { components: ['aiao-img'] }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
