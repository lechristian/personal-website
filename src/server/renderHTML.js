/* ==========================================================================
 * ./src/server/renderHTML.js
 *
 * Server side rendering of HTML
 * ========================================================================== */

import _ from 'lodash';
import fs from 'fs-extra-promise';
import path from 'path';

export default function renderHTML(html, initialState, head) {
  const indexHtmlPath = path.resolve(__dirname, './index.html');
  const htmlString = fs.readFileSync(indexHtmlPath, 'utf8');

  const meta = head.meta.toString();
  const title = head.title.toString();

  const htmlTemplate = _.template(htmlString);
  const rendered = htmlTemplate({
    meta,
    title,
    html,
    initialState
  });

  return rendered;
}
