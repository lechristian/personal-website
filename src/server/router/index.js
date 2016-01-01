/* ==========================================================================
 * ./src/server/router/index.js
 *
 * API Router
 * ========================================================================== */

import { getBlurb } from 'src/server/router/blurb';
import { getBlurbs } from 'src/server/router/blurbs';

export default (router) => {
  router.get('/blurbs', getBlurbs);
  router.get('/blurb/:fileName', getBlurb);

  return router;
};
