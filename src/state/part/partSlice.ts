import { createSlice } from '@reduxjs/toolkit';
import { Part } from 'types/part';

// interface EditPartPayload {
//   id: number;
//   changes: Partial<Part>;
// }

const partSlice = createSlice({
  name: 'part',
  initialState: {} as Part,
  reducers: {},
});

export default partSlice.reducer;
