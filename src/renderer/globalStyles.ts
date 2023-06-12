import { CustomScroll } from 'components/custom-scroll.styled';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }
  
  *::before,
  *::after {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.white};
    font-family: 'Lato', 'Ubuntu', 'Open Sans', sans-serif;
    font-size: inherit;
    line-height: inherit;
    font-size: 1.6rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  button {
    border: 0;
    background-color: white;
    cursor: pointer;
  }

  button:hover,
  button:focus,
  a:focus {
    outline: none;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;

    &:hover,
    &:active,
    &:focus {
      color: ${({ theme }) => theme.primary};
      text-decoration: none;
    }
  }

  .text-overflow-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    height: auto;
    fill: currentColor;
  }

  ${CustomScroll}
`;

export default GlobalStyle;
