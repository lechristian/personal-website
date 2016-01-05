/* ==========================================================================
 * ./src/server/router/blurb.js
 *
 * /api/blurb/:fileName
 * ========================================================================== */

import tracer from 'tracer';

import colorifyCode from 'utils/colorifyCode';

import possibleBlurbs from 'static/blurbs/index.json';

const logger = tracer.colorConsole();

const notFoundTag = '<Not Found>';

export function getBlurb(req, res) {
  let notFound = true
  for (let i = 0; i < possibleBlurbs.length; i += 1) {
    const blurb = possibleBlurbs[i];
    if (blurb.file.indexOf(req.params.fileName) >= 0) {
      notFound = false;
    }
  }

  if (notFound) {
    return res.json({
      blurb: notFoundTag
    });
  }

  colorifyCode(req.params.fileName).then((md) => {
    res.json({
      blurb: md
    });
  }).catch((err) => {
    logger.error(err);
    res.json({
      blurb: notFoundTag
    });
  });
};
