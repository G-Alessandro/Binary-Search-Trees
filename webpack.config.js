const path = require('path');

module.exports = {
  entry: './src/binary-search-trees.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
