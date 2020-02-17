module.exports = {
  name: 'dev-universal-fastify-engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/dev-universal-fastify-engine',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
