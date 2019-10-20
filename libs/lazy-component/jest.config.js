module.exports = {
  name: 'lazy-component',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-component',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
