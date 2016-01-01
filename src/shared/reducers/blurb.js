/* ==========================================================================
 * ./src/shared/reducers/blurb.js
 *
 * Blurb Reducer
 * ========================================================================== */

import { GET_BLURB } from 'src/shared/actions/blurb';
import objectAssign from 'object-assign';

const defaultBlurbState = {
  cache: {}
};

export default function blurb(state = defaultBlurbState, action) {
  switch (action.type) {
    case GET_BLURB:
      const newState = objectAssign({}, state);
      const isFetching = false;
      const fileName = {
        blurbId: action.fileName
      };

      let markdown = {};
      if (action.res.data) {
        markdown = action.res.data.blurb;
      } else {
        markdown = action.res;
      }

      newState.cache[fileName.blurbId] = {
        isFetching,
        markdown,
        fileName
      };

      newState.currentBlurb = action.fileName;

      return newState;
    default:
      return state;
  }
}
