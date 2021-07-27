const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html', 'json'],
  projects: [
    ...getJestProjects(),
    '<rootDir>apps/dev-elements-angular',
    '<rootDir>apps/dev-elements-react',
    '<rootDir>apps/dev-elements-vue',
    '<rootDir>apps/dev-lazy-component',
    '<rootDir>apps/dev-lazy-element',
    '<rootDir>apps/dev-lazy-module',
    '<rootDir>apps/dev-nest-angular-universal',
    '<rootDir>apps/dev-universal-fastify-engine',
    '<rootDir>libs/color',
    '<rootDir>libs/date',
    '<rootDir>libs/elements',
    '<rootDir>libs/elements-angular',
    '<rootDir>libs/elements-cdk',
    '<rootDir>libs/elements-react',
    '<rootDir>libs/image-storage',
    '<rootDir>libs/lazy-component',
    '<rootDir>libs/lazy-element',
    '<rootDir>libs/lazy-module',
    '<rootDir>libs/leancloud-hash',
    '<rootDir>libs/nest-angular-universal',
    '<rootDir>libs/nest-typeorm-plus',
    '<rootDir>libs/random',
    '<rootDir>libs/stencil-toolkit',
    '<rootDir>libs/typeorm-plus',
    '<rootDir>libs/universal-fastify-engine',
    '<rootDir>libs/url',
    '<rootDir>libs/util'
  ]
};
