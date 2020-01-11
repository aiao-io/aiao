module.exports = {
  name: 'stencil-lib',
  preset: '@stencil/core/testing',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    '^(?!.*\\\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/stencil-lib'
};
