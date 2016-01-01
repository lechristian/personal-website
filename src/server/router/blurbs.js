/* ==========================================================================
 * ./src/server/router/blurbs.js
 *
 * /api/blurbs
 * ========================================================================== */

export function getBlurbs(req, res) {
  res.json(require('static/blurbs/index.json'));
};
