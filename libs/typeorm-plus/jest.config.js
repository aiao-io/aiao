module.exports = {
  name: 'typeorm-plus',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/typeorm-plus',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
