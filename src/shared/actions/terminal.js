/* ==========================================================================
 * ./src/shared/actions/terminal.js
 *
 * Terminal Actions
 * ========================================================================== */

import { NULL_ACTION } from 'src/shared/actions/constants';
import {
  terminalStateUpdater,
  tabComplete
} from 'src/shared/api/commands';

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const PREVIOUS_COMMAND = 'PREVIOUS_COMMAND';
export const DELETE_REDIRECT = 'DELETE_REDIRECT';
export const TAB_COMPLETE = 'TAB_COMPLETE';

export function executeCommand(evt, path) {
  if (evt.which === 13) {
    const terminalPromise = terminalStateUpdater(evt.target.value, path);
    return {
      type: EXECUTE_COMMAND,
      command: evt.target.value,
      promise: terminalPromise
    };
  } else if (evt.which === 38) {
    return {
      type: PREVIOUS_COMMAND,
      up: true
    };
  } else if (evt.which === 40) {
    return {
      type: PREVIOUS_COMMAND
    };
  } else if (evt.which === 9) {
    const tabCompletePromise = tabComplete(evt.target.value, path);
    return {
      type: TAB_COMPLETE,
      promise: tabCompletePromise
    };
  }

  return {
    type: NULL_ACTION
  };
}

export function deleteRedirect() {
  return {
    type: DELETE_REDIRECT
  };
}
