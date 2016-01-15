/* ==========================================================================
 * ./src/shared/reducers/terminal.js
 *
 * Terminal Reducer
 * ========================================================================== */

import _ from 'lodash';

import {
  EXECUTE_COMMAND,
  PREVIOUS_COMMAND,
  DELETE_REDIRECT,
  TAB_COMPLETE
} from 'src/shared/actions/terminal';
import { HELP_RESPONSE } from 'src/shared/api/commands';

const defaultTerminalState = {
  executed: [
    {
      command: 'help',
      path: '/',
      response: HELP_RESPONSE
    }
  ],
  path: '/',
  render: true,
  selector: 0,
  prevSelector: 0,
  tab: ''
};

function randomNum() {
  return Math.random();
}

export default function terminal(state = defaultTerminalState, action) {
  switch (action.type) {
    case EXECUTE_COMMAND:
      const newState = _.clone(state);
      const response = action.res.response;

      const isClear = response === 'clear';
      const executed = isClear ? [] : _.clone(newState.executed);
      if (!isClear) {
        executed.push({
          command: action.command,
          path: state.path,
          response: response.message
        });
      }

      if (response.path) {
        newState.path = response.path;
      }

      if (response.redirect) {
        newState.redirect = response.redirect;
      }

      newState.executed = executed;
      newState.render = true;
      newState.timestamp = (new Date()).toString() + randomNum().toString();
      newState.selector = 0;
      newState.prevSelector = 0;
      newState.tab = '';
      return newState;

    case PREVIOUS_COMMAND:
      const previousCommandState = _.clone(state);

      if (action.up) {
        if (state.selector + 1 <= state.executed.length) {
          previousCommandState.selector += 1;
        }
      } else if (state.selector - 1 >= 0) {
        previousCommandState.selector -= 1;
      }

      previousCommandState.prevSelector = state.selector;
      previousCommandState.tab = '';

      return previousCommandState;

    case TAB_COMPLETE:
      const tabState = _.clone(state);
      tabState.tab = action.res.message || '';
      return tabState;

    case DELETE_REDIRECT:
      const deleteDirectState = _.clone(state);
      deleteDirectState.render = false;
      delete deleteDirectState.redirect;

      deleteDirectState.tab = '';

      return deleteDirectState;

    default:
      return state;
  }
}
