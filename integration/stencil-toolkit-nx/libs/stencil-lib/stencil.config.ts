import { resolve } from 'path';

import { angularOutputTarget } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
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
    angularOutputTarget({
      componentCorePackage: '@stencil-toolkit-nx/stencil-lib',
      directivesProxyFile: resolve(__dirname, '../angular-lib/src/lib/directives/proxies.ts'),
      directivesUtilsFile: resolve(__dirname, '../angular-lib/src/lib/directives/proxies-utils.ts'),
      directivesArrayFile: resolve(__dirname, '../angular-lib/src/lib/directives/proxies-list.txt'),
      excludeComponents: []
    }),
    reactOutputTarget({
      componentCorePackage: '@stencil-toolkit-nx/stencil-lib',
      proxiesFile: resolve(__dirname, '../react-lib/src/lib/proxies.ts')
    })
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
