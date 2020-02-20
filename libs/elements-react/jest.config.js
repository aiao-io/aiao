module.exports = {
  name: 'elements-react',
  preset: '../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    '^(?!.*\\\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest'
  },
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/elements-react'
};
