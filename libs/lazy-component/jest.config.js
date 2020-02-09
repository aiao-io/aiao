module.exports = {
  name: 'lazy-component',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/lazy-component',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
