module.exports = {
  name: 'image-storage',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/image-storage',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
