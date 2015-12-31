/* ==========================================================================
 * ./webpack.config.base.js
 *
 * Base/Shared Webpack config
 * ========================================================================== */

const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    root: [
      path.resolve(__dirname),
      path.resolve(__dirname, 'node_modules')
    ],
    alias: {
      imgsRoot: path.resolve(__dirname, 'static/images'),
      blurbsRoot: path.resolve(__dirname, 'static/blurbs')
    }
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: [
          path.resolve(__dirname, 'static/images')
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: [
          'last 3 versions',
          'ie >= 8',
          '> 2%'
        ]
      },
      discardComments: {
        removeAll: true
      }
    })
  ]
};
