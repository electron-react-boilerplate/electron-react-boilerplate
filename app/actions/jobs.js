import { REFRESH_JOBS } from '../constants';

export const refreshJobs = jobsState => ({
  type: REFRESH_JOBS,
  jobsState
});
