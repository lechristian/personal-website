/* ==========================================================================
 * ./src/shared/reducers/terminal.js
 *
 * Terminal Reducer
 * ========================================================================== */

import objectAssign from 'object-assign';

import { EXECUTE_COMMAND } from 'src/shared/actions/terminal';
import commands, {
  HELP_RESPONSE,
  UNKNOWN_COMMAND
} from 'src/shared/api/commands';

const defaultTerminalState = {
  executed: [
    {
      command: 'help',
      response: HELP_RESPONSE
    }
  ],
  input: ''
};

function randomNum() {
  return Math.random();
}

export default function executeCommand(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const newState = objectAssign({}, state);

      if (commands[action.payload.command]) {
        newState.executed = commands[action.payload.command](state.executed);
      } else {
        newState.executed = commands[UNKNOWN_COMMAND](
          state.executed,
          action.payload.command
        );
      }

      newState.timestamp = (new Date()).toString() + randomNum().toString();
      return newState;

    default:
      return state;
  }
}
