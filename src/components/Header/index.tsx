import React from 'react';

import {
  Container,
  Logo,
  LogoText,
  LogoTextG,
  Menu,
  Middle,
  MiddleItemHome,
  MiddleItemPart,
} from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>
        <LogoText>
          <LogoTextG>G</LogoTextG>Zema
        </LogoText>
      </Logo>
      <Menu>
        <Middle>
          <MiddleItemHome>Peças</MiddleItemHome>
          <MiddleItemPart>Peça PC011 TESTE</MiddleItemPart>
        </Middle>
      </Menu>
      <div>
        <p>Icon</p>
      </div>
    </Container>
  );
};

export default Header;
