module.exports = {
  name: 'angular-lazy-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/demos/angular-lazy-demo',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
