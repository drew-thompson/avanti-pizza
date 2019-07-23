module.exports = {
  name: 'common-pipes',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/common/pipes',
  snapshotSerializers: ['jest-preset-angular/AngularSnapshotSerializer.js', 'jest-preset-angular/HTMLCommentSerializer.js']
};
