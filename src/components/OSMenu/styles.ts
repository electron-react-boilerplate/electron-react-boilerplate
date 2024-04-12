import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  background-color: ${colors.black};
`;

export const Menu = styled.nav`
  position: relative;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 18px;
`;

export const SubMenu = styled.nav`
  z-index: 9999;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(40px);
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${colors.blackLight};
`;

export const Button = styled.button`
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  color: ${colors.greyDark};
  outline: none;
  border: none;
  background-color: inherit;
  color: ${colors.greyMedium};
  padding: 12px 15px;

  &:hover {
    background-color: ${colors.greyFont};
    opacity: 0.6;
  }
`;

export const SubButton = styled(Button)`
  position: relative;
  text-align: left;
  width: 230px;
  color: ${colors.greyMedium};
`;

export const SubButtonLabel = styled.span`
  position: absolute;
  right: 15px;
  transform: translateY(-50%);
  top: 50%;
  font-size: 12px;
  color: ${colors.greyDark};
`;

export const Hr = styled.div`
  width: 100%;
  margin: 5px 0;
  box-sizing: border-box;
  height: 1px;
  background-color: ${colors.greyFont};
`;
