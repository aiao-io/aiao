module.exports = {
  displayName: 'dev-elements-vue',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testTimeout: 10000
};
