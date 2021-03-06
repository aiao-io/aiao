module.exports = {
  name: 'util',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/util',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  testEnvironment: 'node',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};
