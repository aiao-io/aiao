module.exports = {
  name: 'stencil-toolkit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stencil-toolkit',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
