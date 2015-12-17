require("babel-core").transform("code",{presets: ['es2015']});

const webpack          = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config           = require('./config');
const webpackConfig    = require('./webpack/development');

const paths = config.get('utils_paths');

const server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase : paths.project(config.get('dir_src')),
  hot    : true,
  quiet  : false,
  noInfo : false,
  lazy   : false,
  stats  : {
    colors : true
  }
});

module.exports = server;
