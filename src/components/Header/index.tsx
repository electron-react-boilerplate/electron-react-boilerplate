import React from 'react';
import OSMenu from 'components/OSMenu';

import {
  AppMenu,
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
    <div>
      <OSMenu />
      <AppMenu>
        <Logo>
          <LogoText>
            <LogoTextG>G</LogoTextG>Zema
          </LogoText>
        </Logo>
        <Menu>
          <Middle>
            <MiddleItemHome>
              <MiddleItemHomeLink to="/">Peças</MiddleItemHomeLink>
            </MiddleItemHome>
            <MiddleItemPart to="/">Peça PC011 TESTE</MiddleItemPart>
          </Middle>
        </Menu>
        <div>
          <p>
            <Icon to="/" className="icon-more_vert" />
          </p>
        </div>
      </AppMenu>
    </div>
  );
};

export default Header;
