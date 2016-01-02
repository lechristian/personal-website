/* ==========================================================================
 * ./src/shared/reducers/terminal.js
 *
 * Terminal Reducer
 * ========================================================================== */

import _ from 'lodash';
import objectAssign from 'object-assign';

import { EXECUTE_COMMAND } from 'src/shared/actions/terminal';

const defaultTerminalState = {
  executed: [],
  input: ''
};

function randomNum() {
  return Math.random();
}

function newExecutedCommands(executed, payload) {
  switch (payload.command.toLowerCase()) {
    case 'clear':
      return [];

    default:
      const newExecutedState = _.clone(executed);
      newExecutedState.push({
        command: payload.command
      });

      return newExecutedState;
  }
}

export default function executeCommand(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const newState = objectAssign({}, state);
      newState.executed = newExecutedCommands(state.executed, action.payload);
      newState.timestamp = (new Date()).toString() + randomNum().toString();
      return newState;

    default:
      return state;
  }
}
