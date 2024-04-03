import { configureStore } from '@reduxjs/toolkit';
import operationsReducer from './operations/operationsSlice';
import appReducer from './app/appSlice';

export const store = configureStore({
  reducer: {
    operations: operationsReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
