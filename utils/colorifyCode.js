/* ==========================================================================
 * ./utils/colorifyCode.js
 *
 * Take markdown code snippets and turn it into raw styled html
 * with highlight.js
 * ========================================================================== */

const path = require('path');
const fs = require('fs-extra-promise');
const Promise = require('bluebird');
const lineReader = require('line-reader');
const hljs = require('node_modules/highlight.js/lib/index.js');
const logger = require('tracer').colorConsole();

const blurbsPath = '../static/blurbs/';

module.exports = function(file) {
  return new Promise(function(resolve, reject) {
    const absoluteFilePath = path.resolve(__dirname, blurbsPath, file);

    fs.accessAsync(absoluteFilePath, fs.F_OK)
      .then(function() {
        let markdown = '';
        let tempMd = '';
        let tempToParse = '';
        let tempLang = '';
        let codeFlag = false;

        lineReader.eachLine(absoluteFilePath, {
          encoding: 'utf8'
        }, function(line, last, cb) {
          if (line.match(/\`\`\`/) && !codeFlag) {
            markdown += tempMd;
            tempMd = '';
            tempLang = line.match(/\w+/)[0];
            codeFlag = true;
            cb();
          } else if (line.match(/\`\`\`/) && codeFlag) {
            markdown += '<pre><code class="language-' + tempLang + '">';
            markdown += hljs.highlight(tempLang, tempToParse, true).value;
            markdown += '</code></pre>';
            tempToParse = '';
            tempLang = '';
            codeFlag = false;
            cb();
          } else if (codeFlag) {
            tempToParse += line + '\n';
            cb();
          } else {
            tempMd += line + '\n';
            cb();
          }

          if (last) {
            markdown += tempMd;
            resolve(markdown);
            cb(false);
          }
        });
      })
      .catch(function() {
        reject('File does not exist');
      });
  });
};
