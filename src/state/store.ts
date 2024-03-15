import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Here we will add reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
