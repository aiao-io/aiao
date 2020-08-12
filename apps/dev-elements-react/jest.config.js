module.exports = {
  name: 'dev-elements-react',
  preset: '../../jest.config.js',
  collectCoverageFrom: ['./src/**/*.tsx', '!./src/environments/**', '!./src/main.tsx', '!./src/polyfills.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/dev-elements-react',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } }
};
