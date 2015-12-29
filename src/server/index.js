/* ==========================================================================
 * ./src/server/server.js
 *
 * Server
 * ========================================================================== */

import express from 'express';
import config from 'config';

import logColors from 'config/colors';

import webpack from 'webpack';
import webpackConfig from 'webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import outputWebpackStats from 'utils/outputWebpackStats';

import React from 'react';
import { renderToString } from 'react-dom/server';
import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { fetchComponentData } from 'src/shared/api/utils/fetchComponentData';

import configureStore from 'src/shared/store/configureStore';
import routes from 'src/shared/routes';

import renderHtml from 'src/server/renderHTML';

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

app.get('*', (req, res) => {
  const location = createLocation(req.url);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.log(logColors.cDanger('[74] ' + err.toString()));
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) {
      return res.status(404).end('404 Not Found');
    }

    const store = configureStore({});

    const InitialView = (
      <Provider store={ store }>
        <RoutingContext { ...renderProps } />
      </Provider>
    );

    fetchComponentData(
      store.dispatch,
      renderProps.components,
      renderProps.params
    ).then(() => {
      const componentHTML = renderToString(InitialView);
      const title = DocumentTitle.rewind();
      const initialState = store.getState();
      console.log(logColors.cSuccess('Server Side Rendered: OK'));
      res.status(200).end(renderHtml(componentHTML, initialState, title));
    })
    .catch(error => {
      console.log(logColors.cDanger('[110] ' + error.toString()));
      res.end(renderHtml('', {}, 'Christian Le'));
    });
  });
});

const server = app.listen(config.port, function () {
  const port = server.address().port;
  const notice = `App listening at port: ${ port }`;
  console.log(logColors.cSuccess(notice));
});
