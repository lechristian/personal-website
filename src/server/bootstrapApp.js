/* ==========================================================================
 * ./src/server/bootstrapApp.js
 *
 * Bootstrap React/Redux server side
 * ========================================================================== */

import tracer from 'tracer';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import Helmet from 'react-helmet';

import { fetchComponentData } from 'src/shared/api/utils/fetchComponentData';
import configureStore from 'src/shared/store/configureStore';
import renderHtml from 'src/server/renderHTML';

const logger = tracer.colorConsole();

export default function bootstrapApp(res, renderProps, state) {
  const store = configureStore(state);

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
    const head = Helmet.rewind();
    const initialState = store.getState();

    const viewRendered = renderHtml(componentHTML, initialState, head);
    res.status(200).end(viewRendered);
  })
  .catch(error => {
    logger.error(error.toString());
    res.end(renderHtml('', {}, 'Christian Le'));
  });
};
