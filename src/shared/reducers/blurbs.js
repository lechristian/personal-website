/* ==========================================================================
 * ./src/shared/reducers/blurbs.js
 *
 * Blurbs Reducer
 * ========================================================================== */

import { GET_BLURBS } from 'src/shared/actions/blurbs';
import objectAssign from 'object-assign';

export default function blurbs(state = {}, action) {
  switch (action.type) {
    case GET_BLURBS:
      return objectAssign({}, state);
    default:
      return state;
  }
}
