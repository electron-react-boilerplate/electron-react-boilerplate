import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  margin-bottom: 20px;
`;

export const HorizontalField = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  gap: 20px;
`;

export const SButton = styled.button`
  background-color: ${colors.blue};
  border: none;
  color: ${colors.white};
  padding: 15px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  font-size: 20px;
`;
