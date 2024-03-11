import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const MenuContainer = styled.div`
  background-color: #318af7;
  width: 170px;
  min-height: calc(100vh - 84px);
`;

export const Menu = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
`;

export const List = styled.ul`
  display: block;
  list-style: none;
`;

export const Item = styled.a`
  display: block;
  text-decoration: none;
  text-align: left;
  color: ${colors.white};
  cursor: pointer;
  line-height: 100%;
  padding: 15px;

  &:hover {
    background-color: ${colors.blueDark};
    opacity: 0.6;
  }
`;
