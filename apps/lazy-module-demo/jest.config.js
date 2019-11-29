module.exports = {
  name: 'lazy-module-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lazy-module-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
