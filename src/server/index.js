/* ==========================================================================
 * ./src/server/server.js
 *
 * Server
 * ========================================================================== */

import _ from 'lodash';
import express from 'express';
import tracer from 'tracer';
import config from 'config';
import path from 'path';

import webpack from 'webpack';
import webpackConfig from 'webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import outputWebpackStats from 'utils/outputWebpackStats';
import colorifyCode from 'utils/colorifyCode';

import createLocation from 'history/lib/createLocation';
import { match } from 'react-router';
import bootstrapApp from 'src/server/bootstrapApp';

import { getBlurbs } from 'src/shared/api/blurbs';
import routes from 'src/shared/routes';

const logger = tracer.colorConsole();
const app = express();

delete process.env.BROWSER;

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig, (err, stats) => {
    outputWebpackStats(stats, webpackConfig.output.publicPath);
  });

  app.use(webpackDevMiddleware(compiler, {
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
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../../dist'));
}

app.use('/favicon', express.static(__dirname + '/../../favicon'));

app.get('/api/blurbs', (req, res) => {
  res.json(require('static/blurbs/index.json'));
});

app.get('/api/blurb/:fileName', (req, res) => {
  colorifyCode(req.params.fileName).then(function(md) {
    res.json({
      blurb: md
    })
  }).catch(function(err) {
    logger.error(err);
    res.json({
      blurb: '<Not Found>'
    })
  });
});

app.get('*', (req, res) => {
  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      logger.error(err.toString());
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('404 Not Found');
    }

    bootstrapApp(res, renderProps, {});
  });
});

const server = app.listen(config.port, function () {
  const port = server.address().port;
  const notice = `App listening at port: ${ port }`;
  logger.info(notice);
});
