/* ==========================================================================
 * ./src/shared/actions/blurbs.js
 *
 * Blurbs Actions
 * ========================================================================== */

export const GET_BLURBS = 'GET_BLURBS';

export function getBlurbs(data) {
  return {
    type: GET_BLURBS,
    payload: data
  };
}
