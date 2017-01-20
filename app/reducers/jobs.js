import { REFRESH_JOBS } from '../constants';

const initialJobsState = {};

export default function (state = initialJobsState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case REFRESH_JOBS:
      newState = action.jobsState;
      break;
    default:
      return state;
  }
  return newState;
}