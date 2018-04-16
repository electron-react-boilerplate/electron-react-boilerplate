import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../store/configureStore';
import { dblDotLocalConstants } from '../constants/dblDotLocal.constants';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: remove
};

export default userActions;

function formatErrorMessage(error) {
  let errorMsg = error.toString();
  if (error.stack) {
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
        history.push('/');
        return true;
      })
      .catch(error => {
        dispatch(failure(error));
        const errorMsg = formatErrorMessage(error, dblDotLocalConstants);
        dispatch(alertActions.error(errorMsg));
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
        const errorMsg = formatErrorMessage(error, dblDotLocalConstants);
        dispatch(alertActions.error(errorMsg));
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

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService
      .register(user)
      .then(() => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
        return true;
      })
      .catch(error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      });
  };

  function request(_user) {
    return { type: userConstants.REGISTER_REQUEST, _user };
  }
  function success(_user) {
    return { type: userConstants.REGISTER_SUCCESS, _user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
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

// prefixed function name with underscore because delete is a reserved word in javascript
function remove(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(() => {
        dispatch(success(id));
        return true;
      })
      .catch(error => {
        dispatch(failure(id, error));
        return true;
      });
  };

  function request(_id) {
    return { type: userConstants.DELETE_REQUEST, _id };
  }
  function success(_id) {
    return { type: userConstants.DELETE_SUCCESS, _id };
  }
  function failure(_id, error) {
    return { type: userConstants.DELETE_FAILURE, _id, error };
  }
}
