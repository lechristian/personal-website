/* ==========================================================================
 * ./utils/outputWebpackStats.js
 *
 * Write webpack-stats.json
 * Borrowed/modified from [write-stats.js](https://goo.gl/PE49Jw) by iam4x
 * ========================================================================== */

import fs from 'fs-extra';
import path from 'path';

const statsFileName = 'webpack-stats.json';
const statsPath = path.resolve(__dirname, '../', statsFileName);

export default (stats, publicPath) => {
  const json = stats.toJson();

  const getChunks = (name, ext = /.js$/) => {
    let chunks = json.assetsByChunkName[name];

    if (!(Array.isArray(chunks))) {
      chunks = [chunks];
    }

    return chunks
      .filter(chunk => ext.test(path.extname(chunk)))
      .map(chunk => `${ publicPath }${ chunk }`);
  };

  const script = getChunks('app', /js/);
  const style = getChunks('app', /css/);

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
  console.log('==> File has been written: ' + statsFileName);
};
