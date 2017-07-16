require('shelljs/global');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const baseConfig = require('./webpack.base.conf');
const util = require('./util');

// 清空dist目录
rm('-rf', 'dist');

module.exports = webpackMerge(baseConfig, {
  entry: {
    'build': './examples/main-aot.ts'
  },
  output: {
    path: util.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: util.root('examples/index.html')
    })
  ]
});
