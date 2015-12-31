/* ==========================================================================
 * ./src/server/server.js
 *
 * Server
 * ========================================================================== */

import express from 'express';
import fs from 'fs-extra-promise';
import tracer from 'tracer';
import config from 'config';
import path from 'path';

import webpack from 'webpack';
import webpackConfig from 'webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import outputWebpackStats from 'utils/outputWebpackStats';

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
    noInfo: true,
    quiet: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../../dist'));
}

app.get('/api/blurbs', (req, res) => {
  res.json(require('static/blurbs/index.json'));
});

app.get('/api/blurb/:fileName', (req, res) => {
  const blurbsPath = '../../static/blurbs/';
  const filePath = path.resolve(__dirname, blurbsPath, req.params.fileName);
  fs.readFileAsync(filePath, 'utf8')
    .then(function(str) {
      res.json({
        blurb: str
      })
    })
    .catch(function(err) {
      logger.error(err);
      res.json({
        blurb: null
      });
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

    getBlurbs().then((response) => {
      bootstrapApp(res, renderProps, {
        blurbs: response
      });
    }).catch((error) => {
      logger.error(error);
      bootstrapApp(res, renderProps, {
        blurbs: []
      });
    });
  });
});

const server = app.listen(config.port, function () {
  const port = server.address().port;
  const notice = `App listening at port: ${ port }`;
  logger.info(notice);
});
