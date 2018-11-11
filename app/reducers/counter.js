import { fromJS } from 'immutable';

import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counter';

export const initialState = fromJS({
  count: 0
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.update('count', count => count + 1);
    case DECREMENT_COUNTER:
      return state.update('count', count => count - 1);
    default:
      return state;
  }
}
