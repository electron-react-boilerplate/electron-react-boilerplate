// @flow
import type { {{ camelCase name }}StateType } from '../reducers/{{ camelCase name }}';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}
