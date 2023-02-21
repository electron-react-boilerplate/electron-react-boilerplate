import React from "react";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const GlobalPallete = {
  colors: {
    primary: "#2E4FFF",
    secondary: "#8A2EFF",
    background: "#0f0a16",
    lightGrey: "#6B6E70",
    darkGrey: "#474B4F",
    error: "#FF0000",
    white: "#FFFFFF",
    black: "#000000",
    red: "#FF0000",
  },
};

const CSSVariables = styled.div`
  --color-primary: ${GlobalPallete.colors.primary};
  --color-secondary: ${GlobalPallete.colors.secondary};
  --color-background: ${GlobalPallete.colors.background};
  --color-light-grey: ${GlobalPallete.colors.lightGrey};
  --color-dark-grey: ${GlobalPallete.colors.darkGrey};
  --color-error: ${GlobalPallete.colors.error};
  --color-white: ${GlobalPallete.colors.white};
  --color-black: ${GlobalPallete.colors.black};
  --color-red: ${GlobalPallete.colors.red};

  --width-left-nav: 300px;
`;

const MaterialUIPallet = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: GlobalPallete.colors.primary,
    },
    secondary: {
      main: GlobalPallete.colors.secondary,
    },
  },
});

const GlobalTheme = ({ children }) => {
  return (
    <CSSVariables>
      <ThemeProvider theme={MaterialUIPallet}>{children}</ThemeProvider>
    </CSSVariables>
  );
};

export default GlobalTheme;
