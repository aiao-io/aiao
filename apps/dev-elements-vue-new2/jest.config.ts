module.exports = {
  displayName: 'dev-elements-vue-new2',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.vue$': './deps/vue3-jest',
    '^.+\\.[jt]sx?$': 'ts-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testTimeout: 10000
};
