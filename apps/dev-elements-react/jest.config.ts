/* eslint-disable */
export default {
  displayName: 'dev-elements-react',
  preset: '../../jest.preset.js',
  collectCoverageFrom: ['./src/**/*.tsx', '!./src/environments/**', '!./src/main.tsx', '!./src/polyfills.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/dev-elements-react'
};
