module.exports = {
  name: 'date',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/date',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
