/* ==========================================================================
 * ./src/reducers/index.js
 *
 * Root Reducer
 * ========================================================================== */

import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import navigationReducer from 'src/shared/reducers/navigation';
import terminalReducer from 'src/shared/reducers/terminal';
import messageReducer from 'src/shared/reducers/message';
import blurbsReducer from 'src/shared/reducers/blurbs';
import blurbReducer from 'src/shared/reducers/blurb';

const rootReducer = combineReducers({
  router: routerStateReducer,
  navigation: navigationReducer,
  terminal: terminalReducer,
  message: messageReducer,
  blurbs: blurbsReducer,
  blurb: blurbReducer
});

export default rootReducer;
