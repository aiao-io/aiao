module.exports = {
  name: 'dev-nest-angular-universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-nest-angular-universal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
