module.exports = {
  name: 'dev-lazy-element',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-lazy-element',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
