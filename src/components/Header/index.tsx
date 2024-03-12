import React from 'react';

import {
  Container,
  Logo,
  LogoText,
  LogoTextG,
  Menu,
  Middle,
  MiddleItemHome,
  MiddleItemHomeLink,
  MiddleItemPart,
  Icon,
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
          <MiddleItemHome>
            <MiddleItemHomeLink>Peças</MiddleItemHomeLink>
          </MiddleItemHome>
          <MiddleItemPart>Peça PC011 TESTE</MiddleItemPart>
        </Middle>
      </Menu>
      <div>
        <p>
          <Icon href="/" className="icon-more_vert" />
        </p>
      </div>
    </Container>
  );
};

export default Header;
