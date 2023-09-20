import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

const primaryColors = {
  primary: '#3498ff',
  primary_5: '#bfdfff',
  primary_30: '#75b6f7',
  primary_60: '#64aef8',
  primary_dark: '#1f7af1',
  secondary: '#49c5ff',
  secondary_light: '#70d2ff',
  white: '#FFFFFF',
  black: '#000000',
};
const grayColors = {
  gray_darker: '#333333',
  gray_dark: '#828282',
  gray: '#C2C2C2',
  gray_light: '#EBEBEB',
  gray_lighter: '#F5F5F5',
};
const paletteColors = {
  purple: '#8829ee',
  purple_light: '#dbc5f5',
  red: '#e71b1b',
  red_light: '#F2D7D7',
  orange: '#f79d16',
  orange_light: '#f5d4a3',
  green: '#40e43d',
  green_light: '#a7e2b1',
  yellow: '#fbff09',
  yellow_dark: '#eef077',
};
const dark: DefaultTheme = {
  animation_time: '250ms',

  box_shadow_x_small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  box_shadow_small: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  box_shadow_big: '0 4px 8px rgba(38, 38, 38, 0.2)',

  ...primaryColors,
  ...grayColors,
  ...paletteColors,
};

export type AvailableTheme = 'LIGHT' | 'DARK';

export const THEMES: { [key: string]: AvailableTheme } = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

interface IAppThemes {
  DARK: DefaultTheme;
  LIGHT: DefaultTheme;
}

export const AppThemes: IAppThemes = {
  DARK: dark,
  LIGHT: dark, // TODO: implement light theme
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={AppThemes.DARK}>{children}</ThemeProvider>
);

export default Theme;
