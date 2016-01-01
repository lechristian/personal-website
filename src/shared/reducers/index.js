/* ==========================================================================
 * ./src/reducers/index.js
 *
 * Root Reducer
 * ========================================================================== */

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import navigationReducer from 'src/shared/reducers/navigation';
import blurbsReducer from 'src/shared/reducers/blurbs';
import blurbReducer from 'src/shared/reducers/blurb';

const rootReducer = combineReducers({
  router: routerStateReducer,
  navigation: navigationReducer,
  blurbs: blurbsReducer,
  blurb: blurbReducer
});

export default rootReducer;
