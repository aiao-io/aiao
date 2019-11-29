module.exports = {
  name: 'lazy-component-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/lazy-component-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
