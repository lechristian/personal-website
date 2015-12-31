/* ==========================================================================
 * ./src/shared/actions/blurbs.js
 *
 * Blurbs Actions
 * ========================================================================== */

export const GET_BLURBS = 'GET_BLURBS';

export function fetchBlurbs(data) {
  return {
    type: GET_BLURBS,
    payload: data
  };
}
