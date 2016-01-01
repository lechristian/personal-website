/* ==========================================================================
 * ./src/shared/api/blurb.js
 *
 * Blurb API
 * ========================================================================== */

export function getBlurb(fileName) {
  const file = `${ fileName }.md`;

  if (process.env.BROWSER) {
    const axios = require('axios');
    return axios.get(`/api/blurb/${ file }`);
  } else {
    const colorifyCode = require('utils/colorifyCode');
    return colorifyCode(file);
  }
}
