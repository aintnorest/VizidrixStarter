const webpack       = require('webpack');
const webpackConfig = require('./_base');

webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  return loader;
});

webpackConfig.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      'unused'    : true,
      'dead_code' : true
    }
  })
);

module.exports = webpackConfig;
