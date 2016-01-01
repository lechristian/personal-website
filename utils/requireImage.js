/* ==========================================================================
 * ./utils/requireImage.js
 *
 * Require Image for server side or client side rendering
 * ========================================================================== */

module.exports = function requireImage(imgPath) {
  return process.env.BROWSER ? require('imgsRoot/' + imgPath) :
    require('./imageResolver')(imgPath);
};
