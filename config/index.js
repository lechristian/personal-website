/* ==========================================================================
 * ./config/index.js
 *
 * Configurations
 * ========================================================================== */

const webpackConfig = require('webpack.config');

module.exports = {
  port: process.env.PORT || 3000,
  webpackDev: {
    noInfo: false,
    quiet: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: false,
      chunks: true,
      chunkModules: false,
      modules: false,
      cached: false
    }
  }
};
