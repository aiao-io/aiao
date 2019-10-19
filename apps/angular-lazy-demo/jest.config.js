module.exports = {
  name: 'angular-lazy-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/angular-lazy-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
