/* ==========================================================================
 * ./src/reducers/index.js
 *
 * Root Reducer
 * ========================================================================== */

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import blurbsReducer from 'src/shared/reducers/blurbs';

const rootReducer = combineReducers({
  router: routerStateReducer,
  blurbs: blurbsReducer
});

export default rootReducer;
