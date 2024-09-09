import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { App } from 'types/app';

const initialState: App = {
  fileName: 'Untitled',
  isSaved: true,
  lastSavedFileState: '',
  lastFilePathSaved: '',
  lastGeneratedCodes: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    editApp: (state, action: PayloadAction<App>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { editApp } = appSlice.actions;

export default appSlice.reducer;
