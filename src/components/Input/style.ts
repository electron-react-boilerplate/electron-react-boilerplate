import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div``;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  color: ${colors.greyFont};
  margin-bottom: 12px;
`;

export const SInput = styled.input<{ error?: boolean }>`
  background-color: ${colors.white};
  border: 1px solid ${({ error }) => (error ? colors.red : colors.greyMedium)};
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  font-size: 18px;

  &:disabled {
    background-color: ${colors.greyMedium};
    border-color: ${colors.greyMedium};
    cursor: not-allowed;
  }
`;
