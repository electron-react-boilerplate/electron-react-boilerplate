import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'styles/global.styles';

export const MenuContainer = styled.div`
  background-color: ${colors.blue};
  width: 170px;
  min-height: calc(100vh - 124px);
  flex-shrink: 0;
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

export const Item = styled(Link)`
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

export const ItemBtn = styled.button`
  display: block;
  text-decoration: none;
  text-align: left;
  color: ${colors.white};
  cursor: pointer;
  line-height: 100%;
  padding: 15px;
  width: 100%;
  background-color: ${colors.blue};
  border: none;
  font-size: 16px;

  &:hover {
    background-color: ${colors.blueDark};
    opacity: 0.6;
  }
`;
