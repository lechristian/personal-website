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
    const Promise = require('bluebird');
    const colorifyCode = require('utils/colorifyCode');
    const possibleBlurbs = require('static/blurbs/index.json');
    const notFoundTag = '<Not Found>';

    let notFound = true;
    for (let i = 0; i < possibleBlurbs.length; i += 1) {
      const blurb = possibleBlurbs[i];
      if (blurb.file.indexOf(file) >= 0) {
        notFound = false;
        break;
      }
    }

    if (notFound) {
      return new Promise((resolve) => {
        resolve(notFoundTag);
      });
    }

    return colorifyCode(file);
  }
}
