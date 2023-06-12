import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

// Colors (Validated in pvDesign)
const primaryColors = {
  primary: '#1C5686',
  primary_5: '#F4F7F9',
  primary_30: '#BBCCDB',
  primary_60: '#779ab6',
  primary_dark: '#154064',
  white: '#FFFFFF',
  black: '#000000',
};
const secondaryColors = {
  secondary: '#1AA5BD',
  secondary_5: '#F4FBFC',
  secondary_30: '#BAE4EB',
  secondary_60: '#76C9D7',
  secondary_dark: '#1896AC',
  secondary_light: '#28C1D7',
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

const light: DefaultTheme = {
  animation_time: '250ms',
  
  box_shadow_x_small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  box_shadow_small: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  box_shadow_big: '0 4px 8px rgba(38, 38, 38, 0.2)',

  ...primaryColors,
  ...secondaryColors,
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
  DARK: light, // TODO: implement dark theme
  LIGHT: light,
};

const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={AppThemes.LIGHT}>{children}</ThemeProvider>
);

export default Theme;
