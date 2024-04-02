import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operations, OperationItem } from 'types/part';

interface EditOperationPayload {
  id: number;
  changes: Partial<Operations>;
}

const initialState: Operations = [
  {
    id: 1,
    name: 'Operation 1',
    type: 'Internal',
    activities: [
      {
        id: 1,
        xaxis: '',
        zaxis: '',
        fvalue: '',
        actionValue: '',
        aParamId: '',
        aParamValue: null,
        bParamId: '',
        bParamValue: null,
        cParamId: '',
        cParamValue: null,
      },
    ],
  },
];

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<OperationItem>) => {
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

export const { addOperation, removeOperation, editOperation } =
  operationsSlice.actions;

export default operationsSlice.reducer;
