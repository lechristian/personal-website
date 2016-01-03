/* ==========================================================================
 * ./src/shared/actions/terminal.js
 *
 * Terminal Actions
 * ========================================================================== */

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const DELETE_REDIRECT = 'DELETE_REDIRECT';

export function executeCommand(evt) {
  if (evt.which === 13) {
    return {
      type: EXECUTE_COMMAND,
      payload: {
        command: evt.target.value
      }
    };
  }

  return {};
}

export function deleteRedirect() {
  return {
    type: DELETE_REDIRECT
  };
}
