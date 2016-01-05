/* ==========================================================================
 * ./src/server/router/index.js
 *
 * API Router
 * ========================================================================== */

import { getBlurb } from 'src/server/router/blurb';
import { getBlurbs } from 'src/server/router/blurbs';
import { getFile } from 'src/server/router/cat';
import { sendMessage } from 'src/server/router/message';

export default (router) => {
  router.get('/blurbs', getBlurbs);
  router.get('/blurb/:fileName', getBlurb);
  router.get('/cat/:componentType', getFile);

  router.post('/message', sendMessage);

  return router;
};
