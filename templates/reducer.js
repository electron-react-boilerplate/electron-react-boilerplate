// @flow
import { INCREMENT, DECREMENT } from '../actions/{{camelCase name}}';

export type counterStateType = {
  value: number
};

type actionType = {
  type: string
};

export default function counter(state: number = 0, action: actionType) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
