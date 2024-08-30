import styled from 'styled-components';
import { colors, shadows } from 'styles/global.styles';

export const Menu = styled.button`
  flex-shrink: 0;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 100%;
  background-color: ${colors.white};
  width: 56px;
`;

export const DropDown = styled.nav`
  width: 150px;
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
  z-index: 9999;
  border: 1px solid ${colors.greyDark};
  box-shadow: ${shadows.std};
  border-bottom: none;
`;

// use component
export const Button = styled.button`
  position: relative;
  text-align: left;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: ${colors.greyPreMedium};
  color: ${colors.greyFont};
  padding: 15px 12px;
  cursor: pointer;
  border-bottom: 1px solid ${colors.greyMedium};

  &:hover {
    opacity: 0.6;
    background-color: ${colors.grey};
    color: ${colors.blue};
  }
`;

export const SubMenu = styled(DropDown)`
  top: 0;
  left: 100%;
  transform: translateY(-1px);
`;

export const SubButton = styled(Button)`
  background-color: ${colors.greyMedium};
  border-bottom: 1px solid ${colors.greyDark};

  &:hover {
    opacity: 0.6;
    background-color: ${colors.grey};
    color: ${colors.blue};
  }
`;
