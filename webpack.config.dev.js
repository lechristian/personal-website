/* ==========================================================================
 * ./webpack.config.dev.js
 *
 * Webpack config for Development
 * ========================================================================== */

const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client/index.js'
  ],
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          /dist/,
          /node_modules/
        ],
        loaders: [
          'eslint'
        ]
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          env: {
            development: {
              plugins: [
                [
                  'react-transform',
                  {
                    transforms: [
                      {
                        transform: 'react-transform-catch-errors',
                        imports: [
                          'react',
                          'redbox-react'
                        ]
                      }
                    ]
                  }
                ]
              ]
            }
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?sourceMap',
          'postcss',
          'sass'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true)
      }
    })
  ]
};
