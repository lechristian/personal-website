/* ==========================================================================
 * ./src/shared/reducers/terminal.js
 *
 * Terminal Reducer
 * ========================================================================== */

import { EXECUTE_COMMAND } from 'src/shared/actions/terminal';
import terminalStateUpdater, {
  HELP_RESPONSE
} from 'src/shared/api/commands';

const defaultTerminalState = {
  executed: [
    {
      command: 'help',
      path: '/',
      response: HELP_RESPONSE
    }
  ],
  path: '/'
};

function randomNum() {
  return Math.random();
}

export default function executeCommand(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const command = action.payload.command;
      const newState = terminalStateUpdater(state, command);
      newState.timestamp = (new Date()).toString() + randomNum().toString();

      return newState;

    default:
      return state;
  }
}
