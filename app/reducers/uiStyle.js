// @flow
import { SET_THEME_DARK, SET_THEME_LIGHT, SET_COLOR } from '../constants';

const initialUiStyleState = {
  theme: 'dark',
  color: 'cc7f29'
}

export default function uiStyle (state = initialUiStyleState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case SET_THEME_DARK:
      newState.theme = 'dark';
      break;
    case SET_THEME_LIGHT:
      newState.theme = 'light';
      break;
    case SET_COLOR:
      newState.color = action.color;
      break;
    default:
      return state;
  }
  return newState;
}