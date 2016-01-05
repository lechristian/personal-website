/* ==========================================================================
 * ./src/shared/reducers/message.js
 *
 * Message Reducer
 * ========================================================================== */

import _ from 'lodash';

import { SEND_MESSAGE, UPDATE_MESSAGE } from 'src/shared/actions/message';

const defaultMessageState = {
  message: {
    name: null,
    email: null,
    message: null
  },
  sent: false,
  disable: false
};

export default function message(state = defaultMessageState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      if (action.res.data) {
        return action.res.data;
      }
      return action.res;

    case UPDATE_MESSAGE:
      const newState = _.clone(state);
      const newMessage = _.clone(state.message);

      if (action.payload) {
        newMessage[action.payload.type] = action.payload.value;
      }

      newState.message = newMessage;
      newState.disable = _.filter(newMessage, (n) => {
        return n === null || n === '';
      }).length > 0;

      return newState;

    default:
      return state;
  }
}
