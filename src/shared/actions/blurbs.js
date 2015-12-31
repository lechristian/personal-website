/* ==========================================================================
 * ./src/shared/actions/blurbs.js
 *
 * Blurbs Actions
 * ========================================================================== */

import { getBlurbs } from 'src/shared/api/blurbs';

export const GET_BLURBS = 'GET_BLURBS';

export function fetchBlurbs() {
  const promise = getBlurbs();

  return {
    type: GET_BLURBS,
    promise
  };
}
