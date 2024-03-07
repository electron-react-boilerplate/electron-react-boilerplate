import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const MenuContainer = styled.div`
  background-color: #318af7;
  width: 170px;
  height: 100%;
`;

export const Menu = styled.nav``;

export const MenuItem = styled.a`
  display: block;
  text-decoration: none;
  text-align: left;
  color: ${colors.white};
  cursor: pointer;
  line-height: 100%;
  padding: 15px;
`;
