import styled, { css } from 'styled-components';

export const MainLogo = styled.div`
  min-width: 25%;

  img {
    height: auto;
    min-width: auto;
    width: 160px;
  }
`;

export const NavBarWrapper = styled.div`
  align-items: center;
  column-gap: 2rem;
  display: flex;
  height: 50px;
  padding: 10px 20px;
  width: 100%;
`;

export const Tabs = styled.nav`
  column-gap: 1.5rem;
  display: flex;
  flex-grow: 1;
`;

export const Tab = styled.div<{ selected: boolean }>`
  border-right: 1px solid ${({ theme }) => theme.gray};
  cursor: pointer;
  text-transform: uppercase;
  padding-right: 15px;
  position: relative;

  &:last-of-type {
    border: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  ${({ theme, selected }) =>
    selected
      ? css`
          font-weight: bold;
          &:hover {
            text-decoration: none;
          }
          &:after {
            content: '';
            background-color: ${theme.primary};
            border-radius: 4px;
            height: 100%;
            left: -10%;
            position: absolute;
            top: 0;
            width: 100%;
            z-index: -1;
          }
        `
      : ''}
`;
