module.exports = {
  name: 'lazy-element',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/lazy-element',
  collectCoverageFrom: ['./src/lib/**/*.ts'],

  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' }
};
