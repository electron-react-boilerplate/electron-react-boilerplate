import { SET_RESULTS_CONTENT, SET_JOB_STATUS } from '../constants';

export const setResultsContent = resultsContent => ({
  type: SET_RESULTS_CONTENT,
  resultsContent
});

export const setJobStatus = jobStatus => ({
  type: SET_JOB_STATUS,
  jobStatus
});