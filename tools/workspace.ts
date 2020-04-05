// npm scope
export const NPM_SCOPE = 'aiao';

// 可选范围
export const WORKSPACE_SCOPES = [
  NPM_SCOPE,
  'tools',
  'color',
  'date',
  'elements',
  'elements-angular',
  'elements-cdk',
  'elements-react',
  'image-storage',
  'lazy-component',
  'lazy-element',
  'lazy-module',
  'nest-angular-universal',
  'random',
  'stencil-toolkit',
  'typeorm-plus',
  'universal-fastify-engine',
  'url',
  'util'
];

// 可选类型
export const WORKSPACE_TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'];

// 需要预先编译的库
export const NEED_CHECK_LIBS = ['stencil-toolkit', 'elements', 'image-storage'];
