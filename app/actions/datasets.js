import { REFRESH_DATASETS } from '../constants';

export const refreshDatasets = datasets => ({
  type: REFRESH_DATASETS,
  datasets
});
