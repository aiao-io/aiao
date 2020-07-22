module.exports = {
  name: 'elements-cdk',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/elements-cdk',
  collectCoverageFrom: ['./src/lib/**/*.ts', './*/src/lib/**/*.ts'],
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};
