import { SAVE_TABLES } from '../actions/tables';

const { exec } = require('child_process');

const initialState = {
  tables: []
};

export default function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TABLES:
      console.log('Writing files to disk');
      return { ...state, tables: [...action.tables] };

    default:
      return state;
  }
}
