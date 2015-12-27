/* ==========================================================================
 * ./src/client/index.js
 *
 * Client Root
 * ========================================================================== */

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import showDevTools from './showDevTools';

import configureStore from '../shared/store/configureStore';
import routes from '../shared/routes';

import '../styles/index.scss';

const history = createBrowserHistory();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

render(
  <Provider store={ store }>
    <ReduxRouter>
      <Router children={ routes } history={ history } />
    </ReduxRouter>
  </Provider>,
  rootElement
);

if (process.env.NODE_ENV !== 'production') {
  showDevTools(store);
}
