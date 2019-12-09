module.exports = {
  name: 'docs',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/docs',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
