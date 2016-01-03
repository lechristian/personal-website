/* ==========================================================================
 * ./src/shared/actions/terminal.js
 *
 * Terminal Actions
 * ========================================================================== */

import terminalStateUpdater from 'src/shared/api/commands';
import { NULL_ACTION } from 'src/shared/actions/constants';

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const DELETE_REDIRECT = 'DELETE_REDIRECT';

export function executeCommand(evt, path) {
  if (evt.which === 13) {
    const terminalPromise = terminalStateUpdater(evt.target.value, path);
    return {
      type: EXECUTE_COMMAND,
      command: evt.target.value,
      promise: terminalPromise
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
