import { createSlice } from '@reduxjs/toolkit';
import { ActivityPropsItems } from 'state/activityTestSlice/interface';

const activityTableSave = window.api.store.initial()['activityTableSave'];

const initialState: ActivityPropsItems = {
  activityItems: activityTableSave ? activityTableSave : [],
};

const activityTestSlice = createSlice({
  name: 'activityTest',
  initialState,
  reducers: {
    setActivityItems(state, action) {
      state.activityItems.push(action.payload);
    },
    editActivityItems(state, action) {
      state.activityItems = action.payload;
    },
  },
});

export const { setActivityItems, editActivityItems } =
  activityTestSlice.actions;

export default activityTestSlice.reducer;
