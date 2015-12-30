/* ==========================================================================
 * ./babel.server.js
 *
 * Path and Babel initialization
 * ========================================================================== */

require('app-module-path/register');

var fs = require('fs-extra-promise');
var babelrc = fs.readFileSync('./.babelrc');
var config;
try {
  config = JSON.parse(babelrc);
} catch(err) {
  console.log('==> ERROR: Error parsing your .babelrc.');
  console.log(err.toString);
}

require('babel-core/register')(config);
require('./utils/generateBlurbsSummary')(function() {
  require('./src/server');
});
