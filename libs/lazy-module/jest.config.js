module.exports = {
  name: 'lazy-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-module',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
