/* ==========================================================================
 * ./webpack.config.prod.js
 *
 * Webpack config for Production
 * ========================================================================== */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackOutputStatsPlugin = require('./utils/webpack-output-stats-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/client/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?minimize!postcss!sass-loader'
        )
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(true),
        GA_ID: JSON.stringify(process.env.GA_ID || 'UA-49527002-6')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      screw_ie8: false
    }),
    new WebpackOutputStatsPlugin()
  ]
};
