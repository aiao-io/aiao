module.exports = {
  name: 'dev-lazy-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-lazy-module',
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/environments/**',
    '!./src/main.ts',
    '!./src/main.server.ts',
    '!./src/app/app.server.module.ts',
    '!./src/zone-flsgs.ts',
    '!**/polyfills.ts'
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
