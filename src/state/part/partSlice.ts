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
  name: 'Nova Peça',
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
    changeContourPositionOnOperation: (
      state,
      action: PayloadAction<{ contourId: number; direction: 'up' | 'down' }>,
    ) => {
      const { contourId, direction } = action.payload;
      const operation = state.operations[0]; // assumindo que você quer modificar a primeira operação

      const index = operation.contoursIds.findIndex((id) => id === contourId);
      if (index < 0) return;

      if (direction === 'up' && index > 0) {
        const temp = operation.contoursIds[index];
        operation.contoursIds[index] = operation.contoursIds[index - 1];
        operation.contoursIds[index - 1] = temp;
      } else if (
        direction === 'down' &&
        index < operation.contoursIds.length - 1
      ) {
        const temp = operation.contoursIds[index];
        operation.contoursIds[index] = operation.contoursIds[index + 1];
        operation.contoursIds[index + 1] = temp;
      }
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
  changeContourPositionOnOperation,
} = partSlice.actions;

export default partSlice.reducer;
