/* ==========================================================================
 * ./src/shared/reducers/navigation.js
 *
 * Navigation Reducer
 * ========================================================================== */

import objectAssign from 'object-assign';

import { TOGGLE_TERMINAL } from 'src/shared/actions/navigation';

const defaultNavigationState = {
  terminal: false,
  launcher: false
};

export default function navigation(state = defaultNavigationState, action) {
  switch (action.type) {
    case TOGGLE_TERMINAL:
      const newState = objectAssign({}, state);
      newState.terminal = !state.terminal;
      newState.launcher = true;
      return newState;

    default:
      return state;
  }
}
