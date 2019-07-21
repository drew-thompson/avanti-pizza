module.exports = {
  name: 'avanti-pizza',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/avanti-pizza',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
