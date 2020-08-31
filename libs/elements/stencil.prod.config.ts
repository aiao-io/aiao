import { resolve } from 'path';

import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

const excludeComponents = ['aiao-text-editor-bar', 'aiao-tree-node', 'ion-icon'];
export const config: Config = {
  namespace: 'aiao-elements',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist',
      dir: 'lib',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-hydrate-script'
    },
    {
      type: 'docs-vscode',
      file: resolve(__dirname, 'lib/html.html-data.json'),
      sourceCodeBaseUrl: 'https://github.com/aiao-io/aiao/tree/master/libs/elements'
    },
    // angularOutputTarget({
    //   componentCorePackage: '@aiao/elements',
    //   directivesProxyFile: '../elements-angular/src/lib/directives/proxies.ts',
    //   directivesUtilsFile: '../elements-angular/src/lib/directives/proxies-utils.ts',
    //   directivesArrayFile: '../elements-angular/src/lib/directives/proxies-list.txt',
    //   excludeComponents
    // }),
    {
      type: 'angular',
      componentCorePackage: '@aiao/elements',
      directivesProxyFile: '../elements-angular/src/lib/directives/proxies.ts',
      directivesUtilsFile: '../elements-angular/src/lib/directives/proxies-utils.ts',
      directivesArrayFile: '../elements-angular/src/lib/directives/proxies-list.txt',
      excludeComponents
    },
    reactOutputTarget({
      componentCorePackage: '@aiao/elements',
      proxiesFile: resolve(__dirname, '../elements-react/src/lib/proxies.ts'),
      excludeComponents
    })
    // {
    //   type: 'docs-readme'
    // }
  ],
  extras: {
    cssVarsShim: true,
    dynamicImportShim: true,
    initializeNextTick: true,
    safari10: true,
    scriptDataOpts: true,
    shadowDomShim: true
  },
  tsconfig: 'tsconfig.json',
  globalScript: 'src/lib/global/global.ts',
  enableCache: true
};
