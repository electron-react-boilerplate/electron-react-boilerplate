// @flow
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/Api';

export type counterStateType = {
  +counter: number
};

type actionType = {
  +type: string
};

export default function Api(state: number = 0, action: actionType) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1;
    case DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
}
