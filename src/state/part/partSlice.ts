import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Part, ContourItem, ActivitiyItem, OperationItem } from 'types/part';

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
      id: 1,
      grindingWheel: 'Rebolo',
      name: 'Test',
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
    addOperation: (
      state,
      action: PayloadAction<Omit<Omit<OperationItem, 'id'>, 'contoursIds'>>,
    ) => {
      const maxId = Math.max(
        ...state.operations.map((operation) => operation.id),
        0,
      );
      state.operations.push({
        ...action.payload,
        id: maxId + 1,
        contoursIds: [],
      });
    },
    // refactor after Demo
    addContourToOperation: (
      state,
      action: PayloadAction<{ operationId: number; contourId: number }>,
    ) => {
      const operation = state.operations.find(
        (op) => op.id === action.payload.operationId,
      );
      if (
        operation &&
        !operation.contoursIds.includes(action.payload.contourId)
      ) {
        operation.contoursIds.push(action.payload.contourId);
      }
    },
    removeContourFromOperation: (
      state,
      action: PayloadAction<{ operationId: number; contourId: number }>,
    ) => {
      const operation = state.operations.find(
        (op) => op.id === action.payload.operationId,
      );
      if (operation) {
        operation.contoursIds = operation.contoursIds.filter(
          (id) => id !== action.payload.contourId,
        );
      }
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
  addOperation,
  addContourToOperation,
  removeContourFromOperation,
  changeContourPositionOnOperation,
} = partSlice.actions;

export default partSlice.reducer;
