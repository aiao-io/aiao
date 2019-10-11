module.exports = {
  name: 'aiao-site',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/aiao-site',
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
