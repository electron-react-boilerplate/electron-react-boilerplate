import { REFRESH_JOBS, LOAD_JOB_RESULTS } from '../constants';

export const refreshJobs = jobsState => ({
  type: REFRESH_JOBS,
  jobsState
});

export const loadJobResults = (jobID, results) => ({
  type: LOAD_JOB_RESULTS,
  jobID,
  results
})