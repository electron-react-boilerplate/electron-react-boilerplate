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
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    color: ${({ theme }) => theme.white};
    background: linear-gradient(
      200.96deg,
      ${({ theme }) => theme.gray_darker} -29.09%,
      ${({ theme }) => theme.gray_darker} 51.77%,
      ${({ theme }) => theme.black} 129.35%
    );
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

  svg {
    height: auto;
    fill: currentColor;
  }

  .rs-btn.rs-btn-ghost {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary}
  }

  .rs-notification-content {
    padding: 10px 15px;
  }

  .rs-modal-content {
    background: linear-gradient(
      200.96deg,
      ${({ theme }) => theme.gray_darker} -29.09%,
      ${({ theme }) => theme.gray_darker} 51.77%,
      ${({ theme }) => theme.black} 129.35%
    );
    display: flex;
    flex-direction: column;
  }

  .rs-modal-title {
    color: ${({ theme }) => theme.white};
  }
  
  ${CustomScroll}
`;

export default GlobalStyle;
