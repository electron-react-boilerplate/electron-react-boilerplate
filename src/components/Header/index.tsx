import React from 'react';

import { HeaderContainer, Logo, LogoG } from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <p>
          <LogoG>G</LogoG>Zema
        </p>
      </Logo>
      <div>
        <p>Peças</p>
        <p>Peça PC011 TESTE</p>
      </div>
      <div>
        <p>Icon</p>
      </div>
    </HeaderContainer>
  );
};

export default Header;
