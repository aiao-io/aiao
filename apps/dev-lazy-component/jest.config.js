module.exports = {
  name: 'dev-lazy-component',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-lazy-component',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
