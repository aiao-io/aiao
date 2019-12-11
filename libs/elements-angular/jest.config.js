module.exports = {
  name: 'elements-angular',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/elements-angular',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
