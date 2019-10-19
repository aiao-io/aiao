module.exports = {
  name: 'lazy-element',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-element',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
