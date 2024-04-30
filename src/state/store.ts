import { configureStore } from '@reduxjs/toolkit';
import contoursReducer from './contours/contoursSlice';
import appReducer from './app/appSlice';

export const store = configureStore({
  reducer: {
    contours: contoursReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
