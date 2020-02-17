module.exports = {
  name: 'universal-fastify-engine',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/universal-fastify-engine',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
