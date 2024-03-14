import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
  height: 34px;
  background-color: ${colors.grey};
`;

export const Nav = styled.nav`
  margin-left: 24px;
`;

export const List = styled.ul`
  list-style: '>';
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  color: ${colors.greyDark};
  font-size: 14px;
`;

export const Item = styled.li`
  display: inline;
  line-height: 34px;
  position: relative;
  margin-right: 12px;

  &::after {
    content: '>';
    display: inline;
  }

  &:last-child::after {
    content: '';
  }
`;

export const ItemLink = styled(Link)<{ isActive?: boolean }>`
  padding: 0 8px;
  display: inline-block;
  text-decoration: none;
  height: 100%;
  margin-right: 12px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? colors.blue : colors.greyDark)};

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.greyMedium};
    opacity: 0.5;
  }
`;
