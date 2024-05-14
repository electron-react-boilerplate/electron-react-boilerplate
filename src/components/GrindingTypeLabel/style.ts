import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div<{ fontSize: string }>`
  font-size: ${(props) => props.fontSize};
  padding: 3px 6px;
  border: 1px solid ${colors.blue};
  color: ${colors.blue};
  font-weight: strong;
  margin-right: 16px;
  max-height: 22px;
  display: flex;
  align-items: center;
`;
