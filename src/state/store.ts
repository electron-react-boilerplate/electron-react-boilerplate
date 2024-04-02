import { configureStore } from '@reduxjs/toolkit';
import operationsReducer from './operations/operationsSlice';

export const store = configureStore({
  reducer: {
    operations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
