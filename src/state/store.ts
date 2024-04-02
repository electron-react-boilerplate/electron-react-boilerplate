import { configureStore } from '@reduxjs/toolkit';
import partReducer from './part/partSlice';
import operationsReducer from './operations/operationsSlice';

export const store = configureStore({
  reducer: {
    part: partReducer,
    operations: operationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
