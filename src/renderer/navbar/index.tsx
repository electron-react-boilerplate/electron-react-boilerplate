import React from 'react';
import * as S from './navbar.styled';

const NavBar: React.FC = () => {
  return (
    <S.NavBarWrapper>
      <S.MainLogo
        alt="CustomSnippet logo"
        src="./../../assets/icons/128x128.png"
      />
      <S.Tabs>
        <div>Snippets</div>
        <div>AutoCompletes</div>
        <div>Contact</div>
      </S.Tabs>
    </S.NavBarWrapper>
  );
};

export default NavBar;
