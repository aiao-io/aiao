module.exports = {
  name: 'elements',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/elements',
  collectCoverageFrom: ['./src/lib/**/*.ts', '!./src/lib/**/*.interface.ts', '!src/lib/global/global.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  transform: {
    '^.+.(ts|mjs|js|html)$': 'jest-preset-angular'
  },
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } }
};
