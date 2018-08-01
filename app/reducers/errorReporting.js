// @flow
import { TOGGLE_ERROR_REPORTING } from '../actions/errorReporting';

export type errorReportingStateType = {
  +isReportingErrors: boolean
};

type actionType = {
  +type: string
};

export default function errorReporting(
  state: boolean = false,
  action: actionType
) {
  switch (action.type) {
    case TOGGLE_ERROR_REPORTING:
      return !state;
    default:
      return state;
  }
}
