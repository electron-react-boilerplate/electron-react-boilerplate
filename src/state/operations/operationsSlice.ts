import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operations } from 'types/part';

interface EditOperationPayload {
  id: number;
  changes: Partial<Operations>;
}

export const initialState: Operations = [
  {
    id: 1,
    name: 'Operação',
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
    replaceOperation: (_state, action: PayloadAction<Operations>) => {
      return action.payload;
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

export const { replaceOperation, removeOperation, editOperation } =
  operationsSlice.actions;

export default operationsSlice.reducer;
