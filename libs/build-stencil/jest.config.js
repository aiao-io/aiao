module.exports = {
  name: 'stencil',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stencil',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
