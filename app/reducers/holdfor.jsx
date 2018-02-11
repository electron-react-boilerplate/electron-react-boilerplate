// @flow
import { SET_HOLD_FOR, CLEAR_HOLD_FOR } from '../actions/holdfor';

type actionType = {
  type: string
};

export default function holdFor(state: string = '', action: actionType) {
  switch (action.type) {
    case SET_HOLD_FOR: {
      return action.payload;
    }
    case CLEAR_HOLD_FOR:
      return '';
    default:
      return state;
  }
}
