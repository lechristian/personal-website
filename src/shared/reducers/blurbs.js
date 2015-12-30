/* ==========================================================================
 * ./src/shared/reducers/blurbs.js
 *
 * Blurbs Reducer
 * ========================================================================== */

import { GET_BLURBS } from 'src/shared/actions/blurbs';

export default function blurbs(state = {}, action) {
  switch (action.type) {
    case GET_BLURBS:
      return state;
    default:
      return state;
  }
}
