module.exports = {
  name: 'elements-cdk',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/elements-cdk',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
