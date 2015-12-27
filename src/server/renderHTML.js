/* ==========================================================================
 * ./src/server/renderHTML.js
 *
 * Server side rendering of HTML
 * ========================================================================== */

import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';

export default function renderHTML(html, initialState) {
  const indexHtmlPath = path.resolve(__dirname, './index.html');
  const htmlString = fs.readFileSync(indexHtmlPath, 'utf8');
  const htmlTemplate = _.template(htmlString);
  const rendered = htmlTemplate({
    html,
    initialState
  });

  return rendered;
}
