/* ==========================================================================
 * ./src/shared/reducers/blurb.js
 *
 * Blurb Reducer
 * ========================================================================== */

import objectAssign from 'object-assign';

import { GET_BLURB } from 'src/shared/actions/blurb';

const defaultBlurbState = {
  cache: {}
};

const SUMMARY_REGEX = /\<\!\-\-\-[\s\S]*\-\-\>/;

function getSummary(markdown) {
  const rawSummary = markdown.match(SUMMARY_REGEX)[0].split(/\r?\n/);
  return rawSummary.slice(1, -1).join(' ');
}

export default function blurb(state = defaultBlurbState, action) {
  switch (action.type) {
    case GET_BLURB:
      const newState = objectAssign({}, state);
      const isFetching = false;
      const fileName = {
        blurbId: action.fileName
      };

      let markdown = '';
      if (action.res.data) {
        markdown = action.res.data.blurb;
      } else {
        markdown = action.res;
      }

      const summary = getSummary(markdown);

      newState.cache[fileName.blurbId] = {
        isFetching,
        markdown,
        fileName,
        summary
      };
      newState.currentBlurb = action.fileName;
      return newState;

    default:
      return state;
  }
}
