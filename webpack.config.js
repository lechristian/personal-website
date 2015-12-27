const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nodeEnvironment = process.env.NODE_ENV;

let logColors;
if (nodeEnvironment !== 'production') {
  logColors = require('./config/colors');
}

Object.assign = Object.assign || require('object-assign');

let webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
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

if (nodeEnvironment === 'production' || nodeEnvironment === 'staging') {
  webpackConfig = Object.assign(webpackConfig, {
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
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: 'url-loader?limit=8192'
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('style.css'),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        screw_ie8: false
      })
    ]
  });
} else {
  webpackConfig = Object.assign(webpackConfig, {
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
          test: /\.(png|jpg|gif|jpeg)$/,
          loader: 'url-loader?limit=8192'
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
      new webpack.HotModuleReplacementPlugin()
    ]
  });

  const loaders = webpackConfig.module.loaders.map(function (loader) {
    if (/babel/.test(loader.loader)) {
      console.log(logColors.cWarning('Applying HMR'));

      if (loader.query.env.development.plugins[0][0] !== 'react-transform') {
        console.log(
          logColors.cError('==> Error: react-transform must be first plugin')
        );
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
