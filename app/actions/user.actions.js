import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../store/configureStore';
import { dblDotLocalConstants } from '../constants/dblDotLocal.constants';
import { navigationConstants } from '../constants/navigation.constants';

export const userActions = {
  login,
  logout,
  getAll
};

export default userActions;

function formatErrorMessage(error) {
  let errorMsg = error.toString();
  if (error.messageDisplayAs) {
    errorMsg = error.messageDisplayAs;
  } else if (error.message) {
    if (error.message === 'Failed to fetch') {
      errorMsg = `${
        error.message
      }. Check that 'DBL dot Local' process is running at ${
        dblDotLocalConstants.HTTP_DBL_DOT_LOCAL_BASE_URL
      }`;
    } else {
      errorMsg = error.message;
    }
  }
  return errorMsg;
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    userService
      .login(username, password)
      .then(user => {
        dispatch(success(user));
        history.push(navigationConstants.NAVIGATION_BUNDLES);
        return true;
      })
      .catch(error => {
        dispatch(failure(error));
        const errorMsg = formatErrorMessage(error, dblDotLocalConstants);
        dispatch(alertActions.error({ error, message: errorMsg }));
        return true;
      });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  return dispatch => {
    const user = userService.getUser();
    dispatch(request({ user }));
    userService
      .logout()
      .then(() => {
        dispatch(success(user));
        return true;
      })
      .catch(error => {
        dispatch(failure({ user, error }));
        const message = formatErrorMessage(error, dblDotLocalConstants);
        dispatch(alertActions.error({ error, message }));
        return true;
      });
  };
  function request(_user) {
    return { type: userConstants.LOGOUT_REQUEST, _user };
  }
  function success(_user) {
    return { type: userConstants.LOGOUT_SUCCESS, _user };
  }
  function failure(error) {
    return { type: userConstants.LOGOUT_WITH_ERROR, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    return userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error))
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
