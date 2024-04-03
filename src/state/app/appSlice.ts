import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { App } from 'types/app';

const initialState: App = {
  lastFilePathSaved: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    replaceApp: (_state, action: PayloadAction<App>) => {
      return action.payload;
    },
  },
});

export const { replaceApp } = appSlice.actions;

export default appSlice.reducer;
