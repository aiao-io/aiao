module.exports = {
  name: 'sample-lazy-module',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/samples/sample-lazy-module',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
