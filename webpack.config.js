/* ==========================================================================
 * ./webpack.config.js
 *
 * Webpack config
 * ========================================================================== */

'use strict';

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const logger = require('tracer').colorConsole();
const WebpackOutputStatsPlugin = require('./utils/webpack-output-stats-plugin');

const isDev = process.env.NODE_ENV === 'development';

let webpackConfig = require('./webpack.config.base');
const webpackAdd = isDev
  ? require('./webpack.config.dev')
  : require('./webpack.config.prod');

webpackConfig.devtool = webpackAdd.devtool;
webpackConfig.entry = webpackAdd.entry;
webpackConfig.plugins = webpackConfig.plugins.concat(webpackAdd.plugins);

_.forEach(webpackAdd.module, function(value, key) {
  let temp = webpackConfig.module[key] || [];
  temp = temp.concat(value);

  webpackConfig.module[key] = temp;
});

if (isDev) {
  const loaders = webpackConfig.module.loaders.map(function (loader) {
    if (/babel/.test(loader.loader)) {
      logger.info('Applying HMR');

      if (loader.query.env.development.plugins[0][0] !== 'react-transform') {
        logger.error('==> Error: react-transform must be first plugin');
        return loader;
      }

      const reactTransformHMR = {
        transform: 'react-transform-hmr',
        imports: [
          'react'
        ],
        locals: [
          'module'
        ]
      };

      loader.query.env.development.plugins[0][1]
        .transforms.push(reactTransformHMR);
    }

    return loader;
  });

  webpackConfig.module.loaders = loaders;
}

module.exports = webpackConfig;
