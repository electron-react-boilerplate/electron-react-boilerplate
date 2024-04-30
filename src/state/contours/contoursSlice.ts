import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contours } from 'types/part';

interface EditContourPayload {
  id: number;
  changes: Partial<Contours>;
}

export const initialState: Contours = [
  {
    id: 1,
    name: 'Contorno',
    type: 'Internal',
    activities: [
      {
        id: 1,
        xaxis: '',
        zaxis: '',
        fvalue: '',
        actionCode: '',
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

const contoursSlice = createSlice({
  name: 'contours',
  initialState,
  reducers: {
    replaceContour: (_state, action: PayloadAction<Contours>) => {
      return action.payload;
    },
    removeContour: (state, action: PayloadAction<number>) => {
      return state.filter((contour) => contour.id !== action.payload);
    },
    editContour: (state, action: PayloadAction<EditContourPayload>) => {
      const { id, changes } = action.payload;
      const index = state.findIndex((contour) => contour.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...changes };
      }
    },
  },
});

export const { replaceContour, removeContour, editContour } =
  contoursSlice.actions;

export default contoursSlice.reducer;
