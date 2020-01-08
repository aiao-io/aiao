export interface NavNode {
  name: string;
  type: string;
  path: string;
  children: NavNode[];
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

export const mockNavs = [
  {
    name: 'Introduction',
    type: 'md',
    path: '/',
    children: []
  },
  {
    name: 'integration',
    type: 'dir',
    path: '/integration',
    children: [
      {
        name: 'Introduction',
        type: 'md',
        path: '/integration',
        children: []
      },
      {
        name: 'lazy-component',
        type: 'dir',
        path: '/integration/lazy-component',
        children: []
      },
      {
        name: 'lazy-element',
        type: 'dir',
        path: '/integration/lazy-element',
        children: []
      },
      {
        name: 'lazy-module',
        type: 'dir',
        path: '/integration/lazy-module',
        children: []
      },
      {
        name: 'stencil-toolkit-nx',
        type: 'dir',
        path: '/integration/stencil-toolkit-nx',
        children: []
      }
    ]
  },
  {
    name: 'libs',
    type: 'dir',
    path: '/libs',
    children: [
      {
        name: 'color',
        type: 'dir',
        path: '/libs/color',
        children: []
      },
      {
        name: 'elements',
        type: 'dir',
        path: '/libs/elements',
        children: [
          {
            name: 'Introduction',
            type: 'md',
            path: '/libs/elements',
            children: []
          },
          {
            name: 'src',
            type: 'dir',
            path: '/libs/elements/src',
            children: [
              {
                name: 'lib',
                type: 'dir',
                path: '/libs/elements/src/lib',
                children: [
                  {
                    name: 'components',
                    type: 'dir',
                    path: '/libs/elements/src/lib/components',
                    children: [
                      {
                        name: 'elements-editor',
                        type: 'dir',
                        path: '/libs/elements/src/lib/components/elements-editor',
                        children: []
                      },
                      {
                        name: 'elements-view',
                        type: 'dir',
                        path: '/libs/elements/src/lib/components/elements-view',
                        children: []
                      },
                      {
                        name: 'img',
                        type: 'dir',
                        path: '/libs/elements/src/lib/components/img',
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'elements-angular',
        type: 'dir',
        path: '/libs/elements-angular',
        children: []
      },
      {
        name: 'elements-cdk',
        type: 'dir',
        path: '/libs/elements-cdk',
        children: []
      },
      {
        name: 'image-storage',
        type: 'dir',
        path: '/libs/image-storage',
        children: []
      },
      {
        name: 'lazy-component',
        type: 'dir',
        path: '/libs/lazy-component',
        children: []
      },
      {
        name: 'lazy-element',
        type: 'dir',
        path: '/libs/lazy-element',
        children: []
      },
      {
        name: 'lazy-module',
        type: 'dir',
        path: '/libs/lazy-module',
        children: []
      },
      {
        name: 'stencil-toolkit',
        type: 'dir',
        path: '/libs/stencil-toolkit',
        children: []
      },
      {
        name: 'util',
        type: 'dir',
        path: '/libs/util',
        children: []
      }
    ]
  }
];
