export interface NavPath {
  name: string;
  path: string;
  children: NavPath[];
}

export const mockNav = [
  {
    name: 'docs',
    path: '/',
    children: [
      {
        name: 'integration',
        path: '/integration',
        children: [
          {
            name: 'lazy-component',
            path: '/integration/lazy-component',
            children: []
          },
          {
            name: 'lazy-element',
            path: '/integration/lazy-element',
            children: []
          },
          {
            name: 'lazy-module',
            path: '/integration/lazy-module',
            children: []
          },
          {
            name: 'stencil-toolkit-nx',
            path: '/integration/stencil-toolkit-nx',
            children: []
          }
        ]
      },
      {
        name: 'libs',
        path: '',
        children: [
          {
            name: 'color',
            path: '/libs/color',
            children: []
          },
          {
            name: 'elements',
            path: '/libs/elements',
            children: [
              {
                name: 'elements-editor',
                path: '/libs/elements/src/lib/components/elements-editor',
                children: []
              },
              {
                name: 'elements-view',
                path: '/libs/elements/src/lib/components/elements-view',
                children: []
              },
              {
                name: 'elements-img',
                path: '/libs/elements/src/lib/components/elements-img',
                children: []
              }
            ]
          },
          {
            name: 'elements-angular',
            path: '/libs/elements-angular',
            children: []
          },
          {
            name: 'elements-cdk',
            path: '/libs/elements-cdk',
            children: []
          },
          {
            name: 'image-storage',
            path: '/libs/image-storage',
            children: []
          },
          {
            name: 'lazy-component',
            path: '/libs/lazy-component',
            children: []
          },
          {
            name: 'lazy-element',
            path: '/libs/lazy-element',
            children: []
          },
          {
            name: 'lazy-module',
            path: '/libs/lazy-module',
            children: []
          },
          {
            name: 'stencil-toolkit',
            path: '/libs/stencil-toolkit',
            children: []
          },
          {
            name: 'util',
            path: '/libs/util',
            children: []
          }
        ]
      }
    ]
  }
];
