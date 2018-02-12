// @flow
import SendKeys from 'send-keys-native';
import type { counterStateType } from '../reducers/counter';

type actionType = {
  type: string
};

export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

let interval;

export function increment() {
  interval = setInterval(SendKeys.leftArrow, 1000);
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  clearInterval(interval);
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return (dispatch: (action: actionType) => void, getState: () => counterStateType) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: (action: actionType) => void) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
