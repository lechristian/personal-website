/* ==========================================================================
 * ./src/shared/api/blurb.js
 *
 * Blurb API
 * ========================================================================== */

export function getBlurb(fileName) {
  const file = fileName + '.md';

  if (process.env.BROWSER) {
    const axios = require('axios');
    return axios.get(`/api/blurb/${ file }`);
  } else {
    const path = require('path');
    const fs = require('fs-extra-promise');

    const blurbsPath = '../../../static/blurbs/';
    const filePath = path.resolve(__dirname, blurbsPath, file);
    return fs.readFileAsync(filePath, 'utf8');
  }
}
