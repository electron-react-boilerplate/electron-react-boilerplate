import { SET_RESULTS_CONTENT, SET_JOB_STATUS } from '../constants';

const initialResultsState = {
  resultsContent: 'Not yet submitted to mainframe',
  jobStatus: ''
};

export default function (state = initialResultsState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_RESULTS_CONTENT:
      newState.editorContent = action.editorContent;
      break;
    case SET_JOB_STATUS:
      newState.editorPath = action.editorPath;
      break;
    default:
      return state;
  }
  return newState;
}