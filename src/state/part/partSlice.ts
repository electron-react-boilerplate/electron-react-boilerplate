import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part, ContourItem, ActivitiyItem } from 'types/part';

interface EditContourPayload {
  id: number;
  changes: Partial<Part>;
}

const initialActivity: ActivitiyItem = {
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
};

export const initialState: Part = {
  id: 1,
  name: 'Nome da peça (Demo)',
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
  operations: [
    {
      contoursIds: [],
    },
  ],
};

const partSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    addContour: (
      state,
      action: PayloadAction<Omit<Omit<ContourItem, 'id'>, 'activities'>>,
    ) => {
      const maxId = Math.max(...state.contours.map((contour) => contour.id), 0);
      state.contours.push({
        ...action.payload,
        id: maxId + 1,
        activities: [initialActivity],
      });
    },
    // refactor after Demo
    addContourToOperation: (state, action: PayloadAction<number>) => {
      if (!state.operations[0].contoursIds.includes(action.payload)) {
        state.operations[0].contoursIds.push(action.payload);
      }
    },
    removeContourFromOperation: (state, action: PayloadAction<number>) => {
      state.operations[0].contoursIds = state.operations[0].contoursIds.filter(
        (id) => id !== action.payload,
      );
    },
    replacePart: (_, action: PayloadAction<Part>) => {
      return action.payload;
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

export const {
  replacePart,
  removeContour,
  editContour,
  addContour,
  addContourToOperation,
  removeContourFromOperation,
} = partSlice.actions;

export default partSlice.reducer;
