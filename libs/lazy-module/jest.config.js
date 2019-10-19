module.exports = {
  name: 'lazy-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-module',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
