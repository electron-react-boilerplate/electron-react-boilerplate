import { css } from 'styled-components';

export const CustomScroll = css`
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px; /* height of horizontal scrollbar */
    cursor: pointer;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.gray_dark};
    border-radius: 10px;
    cursor: pointer;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.gray_darker};
    cursor: pointer;
  }
`;
