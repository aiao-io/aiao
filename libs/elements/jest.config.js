module.exports = {
  name: 'elements',
  preset: '@stencil/core/testing',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  collectCoverageFrom: ['./src/lib/**/*.ts', './src/lib/**/*.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/elements'
};
