/* ==========================================================================
 * ./src/shared/api/commands.js
 *
 * Possible Commands
 * ========================================================================== */

import _ from 'lodash';

export const UNKNOWN_COMMAND = 'unknown';
export const HELP_RESPONSE = `- clear: Clear the shell\n
    - help: Get a list of possible commands\n
    - ls: List possible pages or folders to go to\n
    - go: Go to a page or folder (just another page that holds more pages)\n
    - cat: Same as 'go' but also prints the file used to render the page`;

const HELP_COMMAND = 'help';
const UNKNOWN_RESPONSE = 'unknown command';

const possibleCommands = {
  clear: () => {
    return [];
  },
  help: (executed) => {
    const helpState = _.clone(executed);
    helpState.push({
      command: HELP_COMMAND,
      response: HELP_RESPONSE
    });

    return helpState;
  }
};

possibleCommands[UNKNOWN_COMMAND] = (executed, command) => {
  const unknownState = _.clone(executed);
  unknownState.push({
    command,
    response: UNKNOWN_RESPONSE
  });

  return unknownState;
};

export default possibleCommands;
