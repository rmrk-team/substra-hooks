module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(@polkadot|@babel/runtime/helpers/esm/))'],
  setupFilesAfterEnv: ['./test/setup.js']
};
