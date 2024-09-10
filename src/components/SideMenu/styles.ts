import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Icon from 'components/Icon';

import { colors } from 'styles/global.styles';

export const MenuContainer = styled.div`
  background-color: ${colors.blue};
  width: 56px;
  min-height: calc(100vh - 124px);
  flex-shrink: 0;
`;

export const ModalText = styled.p`
  color: ${colors.greyFont};
  font-size: 16px;
  margin-bottom: 16px;
`;

export const ModalDetail = styled.p`
  color: ${colors.blackLight};
  font-weight: bold;
  font-style: italic;
  font-size: 16px;
  margin-bottom: 16px;
`;

export const Menu = styled.nav`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  opacity: 0;
  transition: all 2s;

  &.loaded {
    opacity: 1;
  }
`;

export const List = styled.ul`
  display: block;
  list-style: none;
`;

export const ListItem = styled.li``;

export const ItemSimple = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 56px;
  text-decoration: none;
  text-align: left;
  color: ${colors.white};
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 56px;
  text-decoration: none;
  text-align: left;
  color: ${colors.white};
  cursor: pointer;

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

export const StyledIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
