module.exports = {
  name: 'lazy-element-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lazy-element-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
