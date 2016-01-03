/* ==========================================================================
 * ./src/server/router/cat.js
 *
 * /api/cat/:componentType
 * ========================================================================== */

import path from 'path';
import fs from 'fs-extra-promise';
import _ from 'lodash';
import tracer from 'tracer';

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
  const type = req.params.componentType;
  res.json({
    str: cache[type]
  });
};
