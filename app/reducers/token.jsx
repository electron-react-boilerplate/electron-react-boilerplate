// @flow
import {UPDATE_TOKEN} from '../actions/token';

export type tokenStateType = {
  token: number
};

type actionType = {
  type: string,
  payload?: {
    index?: number,
    value?: string
  }
};

export default function token(state: number = 0, action: actionType) {
  let digits;
  let newState = '';
  switch (action.type) {
    case UPDATE_TOKEN:
      digits = Array.from(state.toString());
      digits[action.payload.index] = action.payload.value;

      for (let i = 0; i < 6; i += 1) {
        if (digits[i]) {
          newState += digits[i];
        } else {
          newState += '0';
        }
      }

      return parseInt(newState, 10);
    default:
      return state;
  }
}
