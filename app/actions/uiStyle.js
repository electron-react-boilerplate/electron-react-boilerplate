import { SET_THEME_DARK, SET_THEME_LIGHT, SET_COLOR } from '../constants';

export function setThemeDark () {
  return {
    type: SET_THEME_DARK
  };
}
export function setThemeLight () {
  return {
    type: SET_THEME_LIGHT
  };
}
export function setColor (color) {
  return {
    type: SET_THEME_DARK,
    color
  };
}