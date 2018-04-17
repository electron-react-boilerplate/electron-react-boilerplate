import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.error
      };
    case userConstants.LOGOUT_SUCCESS:
      return {
        loggedOut: true,
      };
    case userConstants.LOGOUT_WITH_ERROR:
      return {
        loggedOut: true,
        error: action.error
      };
    default:
      return state;
  }
}

export default authentication;
