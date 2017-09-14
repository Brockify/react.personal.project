/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
    ]
  }
}