/* ==========================================================================
 * ./src/shared/api/commands.js
 *
 * Possible Commands
 * ========================================================================== */

import _ from 'lodash';
import axios from 'axios';
import Promise from 'bluebird';

import FileDirectory from 'src/shared/api/fileDirectory';
import blurbs from 'static/blurbs/index.json';

export const HELP_RESPONSE = `- clear: Clear the shell\n
    - help: Get a list of possible commands\n
    - ls: List possible pages or folders to go to\n
    - cd: Change directory\n
    - open: Go to a page or folder (just another page that holds more pages)\n
    - cat: Same as 'open' but also prints the file used to render the page\n\n
    Or you can close the terminal for a more tradition navigation method!`;

const blurbPaths = _.map(blurbs, (blurb) => {
  return blurb.file.replace(/\.md$/, '');
});

const fileDirectoryJson = {
  '/': [
    'home',
    'photos',
    'message',
    {
      'blurbs': blurbPaths
    }
  ]
};

const fileDirectory = new FileDirectory(fileDirectoryJson);

const UNKNOWN_RESPONSE = 'unknown command';

function testFilePath(commandParams, statePath) {
  let location = commandParams.length > 1 ? commandParams[1] : '';
  if (/^\.\//.test(location)) {
    location = `${ statePath }/${ location.substring(1) }`;
  } else if (statePath === '/') {
    location = `/${ location }`;
  } else {
    location = `${ statePath }/${ location }`;
  }

  return location;
}

const possibleCommands = {
  clear: () => {
    return new Promise((resolve) => {
      resolve('clear');
    });
  },
  help: () => {
    return new Promise((resolve) => {
      resolve({
        message: HELP_RESPONSE
      });
    });
  },
  cd: (commandParams, statePath) => {
    return new Promise((resolve) => {
      let location = commandParams.length > 1 ? commandParams[1] : '/';
      if (statePath !== '/') {
        location = `${ statePath }/${ location }`;
      }

      const response = fileDirectory.canEnterDirectory(location);

      resolve({
        path: response.enter ? response.path : null,
        message: response.enter ? null : response.path
      });
    });
  },
  ls: (commandParams, statePath) => {
    return new Promise((resolve) => {
      const location = testFilePath(commandParams, statePath);
      const response = fileDirectory.listDirectory(location);

      resolve({
        message: response.error || response
      });
    });
  },
  open: (commandParams, statePath) => {
    return new Promise((resolve) => {
      const location = testFilePath(commandParams, statePath);
      const response = fileDirectory.open(location);

      resolve({
        redirect: !response.error ? response.path : null,
        message: response.error
      });
    });
  },
  cat: (commandParams, statePath) => {
    return new Promise((resolve) => {
      const location = testFilePath(commandParams, statePath);
      const response = fileDirectory.open(location);

      if (response.error) {
        resolve({
          message: response.error
        });
      } else {
        let type = response.path;
        if (type.match(/\/[0-9]/)) {
          type = 'blurb'; // Much hacking and laziness
        } else {
          type = type.replace(/\//g, '');
        }

        axios.get(`/api/cat/${ type }`).then((print) => {
          resolve({
            redirect: response.path,
            message: print.data.str
          });
        });
      }
    });
  }
};

export default function terminalStateUpdater(command, statePath) {
  const commandParams = command.split(' ');

  return new Promise((resolve) => {
    if (possibleCommands[commandParams[0]]) {
      possibleCommands[commandParams[0]](commandParams, statePath)
        .then((response) => {
          resolve({
            response
          });
        });
    } else {
      resolve({
        response: UNKNOWN_RESPONSE
      });
    }
  });
}
