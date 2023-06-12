import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // Colors
    primary: string;
    primary_5: string;
    primary_30: string;
    primary_60: string;
    primary_dark: string;
    white: string;
    black: string;

    secondary: string;
    secondary_5: string;
    secondary_30: string;
    secondary_60: string;
    secondary_dark: string;
    secondary_light: string;

    gray_darker: string;
    gray_dark: string;
    gray: string;
    gray_light: string;
    gray_lighter: string;

    purple: string;
    purple_light: string;
    red: string;
    red_light: string;
    orange: string;
    orange_light: string;
    green: string;
    green_light: string;
    yellow: string;
    yellow_dark: string;

    // Others
    animation_time: string;
    
    box_shadow_x_small: string;
    box_shadow_small: string;
    box_shadow_big: string;
  }
}
