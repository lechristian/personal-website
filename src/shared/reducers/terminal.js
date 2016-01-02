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

export default function executeCommand(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const newState = objectAssign({}, state);
      newState.executed = _.clone(state.executed);
      newState.executed.push({
        command: action.payload.command
      });
      newState.timestamp = (new Date()).toString() + randomNum().toString();
      return newState;

    default:
      return state;
  }
}
