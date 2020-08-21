// npm scope
export const NPM_SCOPE = 'aiao';

// 可选范围
export const WORKSPACE_SCOPES = [
  NPM_SCOPE,
  'color',
  'date',
  'elements-angular',
  'elements-cdk',
  'elements-react',
  'elements',
  'image-storage',
  'lazy-component',
  'lazy-element',
  'lazy-module',
  'leancloud-hash',
  'nest-angular-universal',
  'nest-typeorm-plus',
  'random',
  'stencil-toolkit',
  'tools',
  'typeorm-plus',
  'universal-fastify-engine',
  'url',
  'util'
];

// 可选类型
export const WORKSPACE_TYPES = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'];

// 需要预先编译的库
export const NEED_CHECK_LIBS = ['stencil-toolkit', 'elements', 'image-storage'];

// 需要检查提交的分支名
export const NEED_CHECK_COMMIT_BRANCH_NAMES = ['master'];
