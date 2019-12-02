module.exports = {
  name: 'build-stencil',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/build-stencil',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
