module.exports = {
  displayName: 'dev-nest-angular-universal',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.(html|svg)$',

      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  coverageDirectory: '../../coverage/apps/dev-nest-angular-universal',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment'
  ],
  transform: { '^.+\\.(ts|js|html)$': 'jest-preset-angular' }
};
