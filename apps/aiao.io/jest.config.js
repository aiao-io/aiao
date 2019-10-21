module.exports = {
  name: 'aiao.io',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/aiao.io',
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/{polyfills,main}.ts',
    '!./src/environments/**',
    '!./src/**/*.module.ts'
  ],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
