module.exports = {
  name: 'typeorm-plus',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/typeorm-plus',
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } }
};
