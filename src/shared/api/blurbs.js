/* ==========================================================================
 * ./src/shared/api/blurbs.js
 *
 * Blurbs API
 * ========================================================================== */

export function getBlurbs() {
  if (process.env.BROWSER) {
    const axios = require('axios');
    return axios.get('/api/blurbs');
  } else {
    return new Promise((resolve) => {
      resolve(require('../../../static/blurbs/index.json'));
    });
  }
}
