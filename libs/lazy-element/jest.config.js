module.exports = {
  name: 'lazy-element',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-element',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
