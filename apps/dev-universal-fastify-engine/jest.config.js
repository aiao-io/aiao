module.exports = {
  name: 'dev-universal-fastify-engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-universal-fastify-engine',
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/environments/**',
    '!./src/main.ts',
    '!./src/main.server.ts',
    '!./src/app/app.server.module.ts',
    '!./src/zone-flsgs.ts',
    '!./src/polyfills.ts'
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
