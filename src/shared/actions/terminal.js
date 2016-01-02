/* ==========================================================================
 * ./src/shared/actions/terminal.js
 *
 * Terminal Actions
 * ========================================================================== */

export const EXECUTE_COMMAND = 'EXECUTE_COMMAND';
export const UPDATE_INPUT = 'UPDATE_INPUT';

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
