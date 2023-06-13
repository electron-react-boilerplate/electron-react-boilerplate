import React from 'react';
import * as S from './navbar.styled';
import logo from '/assets/icons/CustomSnippetTrans.png';

const NavBar: React.FC = () => {
  return (
    <S.NavBarWrapper>
      <S.MainLogo>
        <img alt="CustomSnippet logo" src={logo} />
      </S.MainLogo>
      <S.Tabs>
        <div>Snippets</div>
        <div>AutoCompletes</div>
        <div>Contact</div>
      </S.Tabs>
    </S.NavBarWrapper>
  );
};

export default NavBar;
