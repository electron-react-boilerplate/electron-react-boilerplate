import { alertConstants } from '../constants';

export const alertActions = {
  success,
  error,
  clear
};

export default alertActions;

function success(message) {
  return { type: alertConstants.SUCCESS, message };
}

function error(data) {
  return { type: alertConstants.ERROR, error: data.error, message: data.message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
