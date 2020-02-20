module.exports = {
  name: 'dev-elements-angular',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-elements-angular',
  collectCoverageFrom: ['./src/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
