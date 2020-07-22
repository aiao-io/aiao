module.exports = {
  name: 'nest-angular-universal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/nest-angular-universal',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};
