module.exports = {
  name: 'elements',
  preset: '@stencil/core/testing',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  coverageDirectory: '../../coverage/libs/elements',
  coverageReporters: ['html', 'json'],
  collectCoverageFrom: ['./src/lib/**/*.ts', './src/lib/**/*.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html']
};
