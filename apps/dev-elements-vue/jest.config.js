module.exports = {
  displayName: 'dev-elements-vue',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/dev-elements-vue'
};
