module.exports = {
  name: 'angular-lib',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/angular-lib',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
