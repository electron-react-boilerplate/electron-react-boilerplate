import { SET_RESULTS_CONTENT, SET_JOB_STATUS, SET_CURRENT_STEP, SET_IS_CONNECTED, SET_IS_SUBMITTED, SET_IS_RETRIEVED, SET_IS_DISCONNECTED } from '../constants';

const initialResultsState = {
  resultsContent: 'Not yet submitted to mainframe',
  jobStatus: '',
  currentStep: '', //connect,submit,retrieve,disconnect
  isConnected: false,
  isSubmitted: false,
  isRetrieved: false,
  isDisconnected: false
};

export default function (state = initialResultsState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_RESULTS_CONTENT:
      newState.resultsContent = action.resultsContent;
      break;
    case SET_JOB_STATUS:
      newState.jobStatus = action.jobStatus;
      break;
    case SET_CURRENT_STEP:
      newState.currentStep = action.currentStep;
      break;
    case SET_IS_CONNECTED:
      newState.isConnected = action.isConnected;
      break;
    case SET_IS_SUBMITTED:
      newState.isSubmitted = action.isSubmitted;
      break;
    case SET_IS_RETRIEVED:
      newState.isRetrieved = action.isRetrieved;
      break;
    case SET_IS_DISCONNECTED:
      newState.isDisconnected = action.isDisconnected;
      break;
    default:
      return state;
  }
  return newState;
}