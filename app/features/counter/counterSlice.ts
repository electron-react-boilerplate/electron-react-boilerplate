import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    }
  }
});

const { increment } = counterSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.counter.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => dispatch => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export const counterReducer = counterSlice.reducer;

export const counterActions = {
  ...counterSlice.actions,
  incrementAsync,
  incrementIfOdd
};

export const selectCount = (state: RootState) => state.counter.value;
