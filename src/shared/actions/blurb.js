/* ==========================================================================
 * ./src/shared/actions/blurb.js
 *
 * Blurb Actions
 * ========================================================================== */

import { getBlurb } from 'src/shared/api/blurb';

export const GET_BLURB = 'GET_BLURB';

export function fetchBlurb(params) {
  const fileName = params.blurbId;
  const promise = getBlurb(fileName);

  return {
    type: GET_BLURB,
    fileName,
    promise
  };
}
