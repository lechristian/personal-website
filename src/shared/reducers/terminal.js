/* ==========================================================================
 * ./src/shared/reducers/terminal.js
 *
 * Terminal Reducer
 * ========================================================================== */

import _ from 'lodash';

import { EXECUTE_COMMAND, DELETE_REDIRECT } from 'src/shared/actions/terminal';
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
  path: '/',
  render: true
};

function randomNum() {
  return Math.random();
}

export default function terminal(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const command = action.payload.command;
      const newState = terminalStateUpdater(state, command);
      newState.render = true;
      newState.timestamp = (new Date()).toString() + randomNum().toString();

      return newState;

    case DELETE_REDIRECT:
      const deleteDirectState = _.clone(state);
      deleteDirectState.render = false;
      delete deleteDirectState.redirect;

      return deleteDirectState;

    default:
      return state;
  }
}
