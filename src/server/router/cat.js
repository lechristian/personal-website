/* ==========================================================================
 * ./src/server/router/cat.js
 *
 * /api/cat/:componentType
 * ========================================================================== */

import path from 'path';
import fs from 'fs-extra-promise';
import _ from 'lodash';
import tracer from 'tracer';

import prism from 'utils/prism';

const logger = tracer.colorConsole();
const componentPath = path.resolve(__dirname, '../../shared/components/');
const fileMap = {
  home: `${ componentPath }/home.js`,
  photos: `${ componentPath }/photos.js`,
  blurbs: `${ componentPath }/blurbs.js`,
  blurb: `${ componentPath }/blurb.js`
};

const cache = {};
_.forEach(fileMap, (value, key) => {
  cache[key] = fs.readFileSync(value, 'utf8');
});

export function getFile(req, res) {
  const componentType = req.params.componentType;
  let highlighted = '<pre><code class="language-jsx">';
  highlighted += prism.highlight(cache[componentType], prism.languages.jsx);
  highlighted += '</code></pre>';
  res.json({
    str: highlighted
  });
};
