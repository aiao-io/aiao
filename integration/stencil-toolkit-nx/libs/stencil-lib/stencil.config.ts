import { resolve } from 'path';
import { cwd } from 'process';

import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-lib',
  plugins: [sass()],
  bundles: [{ components: ['my-component'] }],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'angular',
      componentCorePackage: '@stencil-toolkit-nx/stencil-lib',
      directivesProxyFile: '../angular-lib/src/lib/directives/proxies.ts',
      directivesUtilsFile: '../angular-lib/src/lib/directives/proxies-utils.ts',
      directivesArrayFile: '../angular-lib/src/lib/directives/proxies-list.txt',
      excludeComponents: []
    }
  ],
  copy: [
    {
      src: resolve('node_modules/@ionic/core'),
      dest: resolve('libs/stencil-lib/vendors/ionic')
    }
  ],
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts'
};
