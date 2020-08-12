module.exports = {
  name: 'elements-react',
  preset: '../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { cwd: __dirname, configFile: './babel-jest.config.json' }]
  },
  collectCoverageFrom: ['./src/lib/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/elements-react'
};
