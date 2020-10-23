module.exports = {
  name: 'universal-fastify-engine',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/libs/universal-fastify-engine'
};
