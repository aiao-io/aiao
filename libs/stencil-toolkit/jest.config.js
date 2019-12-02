module.exports = {
  name: 'stencil-toolkit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stencil-toolkit',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
