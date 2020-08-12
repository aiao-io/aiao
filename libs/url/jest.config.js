module.exports = {
  name: 'url',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/url',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};
