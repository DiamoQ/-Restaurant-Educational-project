'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/js/index.js', './node_modules/jquery/dist/jquery.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
