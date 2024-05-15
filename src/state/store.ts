import { configureStore } from '@reduxjs/toolkit';
import partsReducer from './part/partSlice';
import appReducer from './app/appSlice';

export const store = configureStore({
  reducer: {
    part: partsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
