// @flow
import { createSlice } from '@reduxjs/toolkit';
import type { GetState, Dispatch } from './types';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
});

export const { increment, decrement } = counterSlice.actions;

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export const counterReducer = counterSlice.reducer;
export const counterActions = {
  ...counterSlice.actions,
  incrementIfOdd,
  incrementAsync
};
