/* ==========================================================================
 * ./utils/imageResolver.js
 *
 * Resolve image for server side rendering
 *
 * Used to include images (.jpg, .jpeg, .png, .svg, .gif) server side for
 * universal rendering
 *
 * Borrowed/modified from [image-resolver.js](https://goo.gl/vsFnZZ) by iam4x
 * ========================================================================== */

'use strict';

module.exports = function imageResolver(imagePath) {
  const images = require('../webpack-stats.json').images;

  const regex = new RegExp(`${ imagePath }$`);
  const image = images.find(img => {
    return regex.test(img.original);
  });

  if (image) {
    return image.compiled;
  }
  return '';
};
