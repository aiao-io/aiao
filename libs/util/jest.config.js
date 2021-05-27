module.exports = {
  name: 'util',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/util',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
