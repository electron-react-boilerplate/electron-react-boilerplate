import { REFRESH_DATASETS } from '../constants';

const initialDatasetsState = {};

export default function (state = initialDatasetsState, action) {

  let newState = Object.assign({}, state);

  switch (action.type) {
    case REFRESH_DATASETS:
      newState = action.datasets;
      break;
    default:
      return state;
  }
  return newState;
}