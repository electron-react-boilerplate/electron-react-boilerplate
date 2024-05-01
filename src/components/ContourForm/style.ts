import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Field = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
`;

export const Select = styled.select`
  background-color: ${colors.white};
  border: 1px solid ${colors.greyMedium};
  box-sizing: border-box;
  padding: 10px 10px;
  width: 100%;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: ${colors.blue};
  border: none;
  color: ${colors.white};
  padding: 15px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  font-size: 20px;
`;
