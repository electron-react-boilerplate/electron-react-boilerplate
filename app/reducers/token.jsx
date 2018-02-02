// @flow
import { UPDATE_TOKEN } from '../actions/token';

type actionType = {
  type: string,
  payload?: {
    index?: number,
    value?: string
  }
};

export default function token(state: string = '______', action: actionType) {
  let digits;
  let newState = '';
  switch (action.type) {
    case UPDATE_TOKEN:
      const numberVal = parseInt(action.payload.value, 10);
      let stringVal = action.payload.value;

      if (!numberVal || numberVal > 9) {
        stringVal = '_';
      }

      digits = Array.from(state.toString());
      digits[action.payload.index] = stringVal;

      for (let i = 0; i < 6; i += 1) {
        if (digits[i]) {
          newState += digits[i];
        } else {
          newState += '_';
        }
      }

      return newState;
    default:
      return state;
  }
}
