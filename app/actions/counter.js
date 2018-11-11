export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const INCREMENT_IF_ODD = 'INCREMENT_IF_ODD';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
}

export function incrementIfOdd() {
  return {
    type: INCREMENT_IF_ODD
  };
}

export function incrementAsync() {
  return {
    type: INCREMENT_ASYNC
  };
}
