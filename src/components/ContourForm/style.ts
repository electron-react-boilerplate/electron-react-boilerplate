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
  font-size: 18px;
  color: ${colors.greyFont};
  margin-bottom: 12px;
`;

export const RadioButton = styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin-top: 18px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  color: ${colors.blackLight};

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #ccc;
    border-radius: 50%;
  }

  input:checked ~ span {
    background-color: #2196f3;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  span:after {
    top: 4px;
    left: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${colors.white};
  }
`;

// use component Button
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
