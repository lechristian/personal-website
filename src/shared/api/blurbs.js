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
    const path = require('path');
    const fs = require('fs-extra-promise');

    const blurbsDir = path.resolve(__dirname, '../../../static/blurbs');
    return fs.readdirAsync(blurbsDir);
  }
}
