/* ==========================================================================
 * ./src/reducers/index.js
 *
 * Root Reducer
 * ========================================================================== */

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import blurbsReducer from 'src/shared/reducers/blurbs';
import blurbReducer from 'src/shared/reducers/blurb';

const rootReducer = combineReducers({
  router: routerStateReducer,
  blurbs: blurbsReducer,
  blurb: blurbReducer
});

export default rootReducer;
