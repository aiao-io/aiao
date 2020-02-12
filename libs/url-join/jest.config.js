module.exports = {
  name: 'url-join',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/url-join',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
