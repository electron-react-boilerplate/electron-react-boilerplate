import { createSlice } from '@reduxjs/toolkit';
import { Dispatch as ReduxDispatch, Action } from 'redux';

export type Dispatch = ReduxDispatch<Action<string>>;

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementIfOdd: state => {
      state.value += state.value % 2;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

export function incrementAsync(delay = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}

export const counterReducer = counterSlice.reducer;

export type CounterState = ReturnType<typeof counterSlice.reducer>;

export const counterActions = {
  ...counterSlice.actions,
  incrementAsync
};
