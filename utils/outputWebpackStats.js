/* ==========================================================================
 * ./utils/outputWebpackStats.js
 *
 * Write webpack-stats.json
 * Borrowed/modified from [write-stats.js](https://goo.gl/PE49Jw) by iam4x
 * ========================================================================== */

'use strict';

const fs = require('fs-extra-promise');
const path = require('path');
const logger = require('tracer').colorConsole();

const statsFileName = 'webpack-stats.json';
const statsPath = path.resolve(__dirname, '../', statsFileName);

module.exports = function(stats, publicPath) {
  const json = stats.toJson();

  const getChunks = function(name, ext) {
    let chunks = json.assetsByChunkName[name];

    if (!(Array.isArray(chunks))) {
      chunks = [chunks];
    }

    return chunks
      .filter(chunk => ext.test(path.extname(chunk)))
      .map(chunk => `${ publicPath }${ chunk }`);
  };

  const script = getChunks('main', /js/);
  const style = getChunks('main', /css/);

  const imagesRegex = /\.(jpe?g|png|gif|svg)$/;
  const images = json.modules
    .filter(module => imagesRegex.test(module.name))
    .map(image => {
      return {
        original: image.name,
        compiled: `${ publicPath }${ image.assets[0] }`
      };
    });

  const content = {
    script,
    style,
    images
  };

  fs.outputFileSync(statsPath, JSON.stringify(content));
  logger.info('==> File has been written: ' + statsFileName);
};
