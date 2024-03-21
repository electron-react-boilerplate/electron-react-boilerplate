import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part } from 'types/part';

interface EditPartPayload {
  id: number;
  changes: Partial<Part>;
}

const partSlice = createSlice({
  name: 'part',
  initialState: [] as Part[],
  reducers: {
    addPart: (state, action) => {
      state.push(action.payload);
    },
    editPart: (state, action: PayloadAction<EditPartPayload>) => {
      const { id, changes } = action.payload;
      const index = state.findIndex((part) => part.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
    removePart: (state, action) => {
      return state.filter((part) => part.id !== action.payload);
    },
  },
});

export default partSlice.reducer;
