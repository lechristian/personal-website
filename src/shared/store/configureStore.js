/* ==========================================================================
 * ./src/shared/store/configureStore.js
 *
 * Configure Redux Store
 * ========================================================================== */

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';

import promiseMiddleware from 'src/shared/api/utils/promiseMiddleware';
import rootReducer from 'src/shared/reducers';
import DevTools from 'src/client/devTools';

const generateMiddlware = () => {
  const universalMiddleware = [
    thunk,
    promiseMiddleware
  ];
  let middleware = {};
  let allComposeElements = [];

  if (process.browser) {
    if (process.env.NODE_ENV === 'production') {
      middleware = applyMiddleware(...universalMiddleware);
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        })
      ];
    } else {
      middleware = applyMiddleware(...universalMiddleware, createLogger());
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        }),
        DevTools.instrument()
      ];
    }
  } else {
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ];
  }

  return allComposeElements;
};

const finalCreateStore = compose(...generateMiddlware())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
