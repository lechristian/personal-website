/* ==========================================================================
 * ./src/server/router/blurb.js
 *
 * /api/blurb/:fileName
 * ========================================================================== */

import tracer from 'tracer';

import colorifyCode from 'utils/colorifyCode';

const logger = tracer.colorConsole();

const notFoundTag = '<Not Found>';

export function getBlurb(req, res) {
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
