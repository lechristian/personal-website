/* ==========================================================================
 * ./src/shared/api/commands.js
 *
 * Possible Commands
 * ========================================================================== */

import _ from 'lodash';
import FileDirectory from 'src/shared/api/fileDirectory';
import blurbs from 'static/blurbs/index.json';

export const HELP_RESPONSE = `- clear: Clear the shell\n
    - help: Get a list of possible commands\n
    - ls: List possible pages or folders to go to\n
    - open: Open a page or folder (just another page that holds more pages)\n
    - cat: Same as 'open' but also prints the file used to render the page`;

const blurbPaths = _.map(blurbs, (blurb) => {
  return blurb.file.replace(/\.md$/, '');
});

const fileDirectoryJson = {
  '/': [
    'home',
    'photos',
    {
      'blurbs': blurbPaths
    }
  ]
};

const fileDirectory = new FileDirectory(fileDirectoryJson);

const UNKNOWN_RESPONSE = 'unknown command';

const possibleCommands = {
  clear: (state) => {
    const newState = state;
    newState.executed = [];
    return newState;
  },
  help: (state, commandParams) => {
    const newState = state;
    const command = commandParams.join(' ');

    newState.executed = _.clone(state.executed);
    newState.executed.push({
      command,
      path: state.path,
      response: HELP_RESPONSE
    });

    return newState;
  },
  cd: (state, commandParams) => {
    const newState = state;
    newState.executed = _.clone(state.executed);

    const response = fileDirectory.canEnterDirectory(
      commandParams.length > 1 ? commandParams[1] : '/'
    );

    newState.executed.push({
      command: commandParams.join(' '),
      path: state.path,
      response: response.enter ? null : response.path
    });

    newState.path = response.enter ? response.path : state.path;

    return newState;
  }
};

export default function terminalStateUpdater(state, command) {
  let newState = state;
  const commandParams = command.split(' ');
  console.log(commandParams);

  if (possibleCommands[commandParams[0]]) {
    newState = possibleCommands[commandParams[0]](state, commandParams);
  } else {
    const unknownCommandState = _.clone(state.executed);
    unknownCommandState.push({
      command,
      path: state.path,
      response: UNKNOWN_RESPONSE
    });

    newState.executed = unknownCommandState;
  }

  return _.clone(state);
}
