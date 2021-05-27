module.exports = {
  name: 'image-storage',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/image-storage',
  collectCoverageFrom: ['./src/lib/**/*.ts', './adapters/*/src/lib/**/*.ts'],

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ]
};
