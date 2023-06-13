import styled from 'styled-components';

export const MainLogo = styled.div`
  min-width: 35%;

  img {
    width: 160px;
    height: auto;
    min-width: auto;
  }
`;

export const NavBarWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  column-gap: 2rem;
  align-items: center;
  padding: 10px 20px;
`;

export const Tabs = styled.nav`
  flex-grow: 1;
  display: flex;
  column-gap: 2rem;
`;
