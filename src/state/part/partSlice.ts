import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part, Contours } from 'types/part';

interface EditContourPayload {
  id: number;
  changes: Partial<Part>;
}

export const initialState: Part = {
  id: 1,
  name: 'Part 1',
  contours: [
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
  ],
};

const partSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    replaceContour: (state, action: PayloadAction<Contours>) => {
      state.contours = action.payload;
    },
    removeContour: (state, action: PayloadAction<number>) => {
      state.contours = state.contours.filter(
        (contour) => contour.id !== action.payload,
      );
    },
    editContour: (state, action: PayloadAction<EditContourPayload>) => {
      const { id, changes } = action.payload;
      const index = state.contours.findIndex((contour) => contour.id === id);
      if (index !== -1) {
        state.contours[index] = {
          ...state.contours[index],
          ...changes,
        };
      }
    },
  },
});

export const { replaceContour, removeContour, editContour } = partSlice.actions;

export default partSlice.reducer;
