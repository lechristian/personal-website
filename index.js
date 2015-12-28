/* ==========================================================================
 * ./babel.server.js
 *
 * Path and Babel initialization
 * ========================================================================== */

require('app-module-path/register');

var fs = require('fs-extra');
var logColors = require('./config/colors');
var babelrc = fs.readFileSync('./.babelrc');
var config;
try {
  config = JSON.parse(babelrc);
} catch(err) {
  console.log(logColors.cDanger('==> ERROR: Error parsing your .babelrc.'));
  console.log(logColors.cDanger(err.toString));
}

require('babel-core/register')(config);
require('./src/server');
