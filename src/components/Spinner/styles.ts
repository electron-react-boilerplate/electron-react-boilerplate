import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  border: 4px solid transparent;
  box-sizing: border-box;
  border-left-color: ${colors.white};
  border-right-color: ${colors.white};
  border-radius: 50%;
  width: 26px;
  height: 26px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
