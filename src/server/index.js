/* ==========================================================================
 * ./src/server/server.js
 *
 * Server
 * ========================================================================== */

import _ from 'lodash';
import express from 'express';
import bodyParser from 'body-parser';
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

import router from 'src/server/router';
import routes from 'src/shared/routes';

delete process.env.BROWSER;

const logger = tracer.colorConsole();
const api = router(express.Router());
const app = express();


// if (process.env.NODE_ENV && process.env.NODE_ENV !== 'develop') {
  // app.use(function(req, res, next) {
    // if ((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
      // res.redirect('https://' + req.get('Host') + req.url);
    // } else {
      // next();
    // }
  // });
// }

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/favicon', express.static(__dirname + '/../../favicon'));

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig, (err, stats) => {
    outputWebpackStats(stats, webpackConfig.output.publicPath);
  });

  app.use(webpackDevMiddleware(compiler, config.webpackDev));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(__dirname + '/../../dist'));
}

app.use('/api', api);

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
