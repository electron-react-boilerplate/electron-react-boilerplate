import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operations } from 'types/part';

interface EditOperationPayload {
  id: number;
  changes: Partial<Operations>;
}

const operationsSlice = createSlice({
  name: 'operations',
  initialState: [] as Operations[],
  reducers: {
    addOperation: (state, action: PayloadAction<Operations>) => {
      state.push(action.payload);
    },
    removeOperation: (state, action: PayloadAction<number>) => {
      return state.filter((operation) => operation.id !== action.payload);
    },
    editOperation: (state, action: PayloadAction<EditOperationPayload>) => {
      const { id, changes } = action.payload;
      const index = state.findIndex((operation) => operation.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
  },
});

export default operationsSlice.reducer;
