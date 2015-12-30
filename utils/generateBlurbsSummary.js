/* ==========================================================================
 * ./utils/generateBlurbsSummary.js
 *
 * Generate blurbs list and summaries
 * ========================================================================== */

'use strict';

const _ = require('lodash');
const path = require('path');
const fs = require('fs-extra-promise');
const Promise = require('bluebird');
const lineReader = require('line-reader');

const logColors = require('config/colors');

const blurbsPath = '../static/blurbs/';
const outputDir = path.resolve(__dirname, blurbsPath, 'index.json');

function extractSummary(rawSummaries) {
  let summaries = [];

  _.forEach(rawSummaries, function(summary) {
    let temp = {
      file: summary[0]
    };

    temp.title = summary[1].substring(2);
    temp.description = '';
    for (let i = 2; i < summary.length; i += 1) {
      temp.description += summary[i];
    }
    summaries.push(temp);
  });

  return summaries;
};

function handleError(err) {
  console.log(logColors.cWarning(JSON.stringify(err, null, 2)));

  fs.outputFileAsync(outputDir, '{}').then(function() {
    console.log(logColors.cWarning('--> Wrote empty file'));
    callback();
  }).catch(function(err) {
    console.log(logColors.cDanger('--> Wrote no file'));
    callback();
  });
}

module.exports = function generateBlurbsSummary(callback) {
  const blurbsDir = path.resolve(__dirname, blurbsPath);
  fs.readdirAsync(blurbsDir).then(function(files) {
    let readPromises = [];

    files = _.without(files, 'index.json');

    _.forEach(files, function(filePath) {
      const readPromise = new Promise(function(resolve) {
        const absoluteFilePath = path.resolve(__dirname, blurbsPath, filePath);
        let lineBuffer = [
          filePath
        ];

        lineReader.eachLine(absoluteFilePath, {
          encoding: 'utf8'
        }, function(line, last, cb) {
          if (line.indexOf('-->') >= 0) {
            resolve(lineBuffer);
            cb(false);
          } else {
            if (line.indexOf('<!---') < 0) {
              lineBuffer.push(line.replace(/\n/g, ' '));
            }
            cb();
          }
        });
      });

      readPromises.push(readPromise);
    });

    Promise.all(readPromises).then(function(response) {
      const summaries = extractSummary(response);

      fs.outputFileAsync(outputDir, JSON.stringify(summaries, null, 2))
        .then(function() {
          console.log(logColors.cSuccess('==> Wrote Blurbs Summaries'));
          callback();
        })
        .catch(function(err) {
          handleError(err);
        });
    });
  }).catch(function(err) {
    handleError(err);
  });
};
