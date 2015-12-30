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
import DocumentTitle from 'react-document-title';
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
    const title = DocumentTitle.rewind();
    const initialState = store.getState();
    logger.info('Server Side Rendered: OK');
    res.status(200).end(renderHtml(componentHTML, initialState, title));
  })
  .catch(error => {
    logger.error(error.toString());
    res.end(renderHtml('', {}, 'Christian Le'));
  });
};
