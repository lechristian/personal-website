/* ==========================================================================
 * ./src/shared/actions/message.js
 *
 * Message Actions
 * ========================================================================== */

import axios from 'axios';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

export function sendMessage(payload) {
  const newPayload = payload;
  newPayload.client = true;
  const promise = axios.post('/api/message', payload);

  return {
    type: SEND_MESSAGE,
    promise
  };
}

export function updateValue(evt) {
  if (evt) {
    return {
      type: UPDATE_MESSAGE,
      payload: {
        type: evt.target.id,
        value: evt.target.value
      }
    };
  }

  return {
    type: UPDATE_MESSAGE
  };
}
