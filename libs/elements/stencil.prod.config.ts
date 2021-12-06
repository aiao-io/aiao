import { resolve } from 'path';

import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';

const excludeComponents = ['aiao-text-editor-bar', 'aiao-tree-node', 'ion-icon'];
export const config: Config = {
  autoprefixCss: true,
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
    }),
    vueOutputTarget({
      componentCorePackage: '@aiao/elements',
      proxiesFile: resolve(__dirname, '../elements-vue/src/lib/proxies.ts'),
      excludeComponents,
      componentModels: [
        {
          elements: ['aiao-code-editor', 'aiao-code-diff-editor', 'aiao-elements-editor'],
          event: '',
          targetAttr: 'value',
          externalEvent: 'aiaoChange'
        }
      ]
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
