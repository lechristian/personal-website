/* ==========================================================================
 * ./src/shared/actions/terminal.js
 *
 * Terminal Actions
 * ========================================================================== */

import terminalStateUpdater from 'src/shared/api/commands';

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const DELETE_REDIRECT = 'DELETE_REDIRECT';

export function executeCommand(evt, path) {
  console.log('Yo');
  if (evt.which === 13) {
    return {
      type: EXECUTE_COMMAND,
      command: evt.target.value,
      promise: terminalStateUpdater(evt.target.value, path)
    };
  }

  return {};
}

export function deleteRedirect() {
  return {
    type: DELETE_REDIRECT
  };
}
