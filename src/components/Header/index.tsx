import React from 'react';
import { useSelector } from 'react-redux';

import OSMenu from 'components/OSMenu';
import { Operations } from 'types/part';

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
  const isSaved = useSelector(
    (state: { app: { isSaved: boolean } }) => state.app.isSaved,
  );
  const operationName = useSelector(
    (state: { operations: Operations }) => state.operations[0].name,
  );
  const showUnsavedHighlight = () => {
    if (!isSaved) return '*';
    return '';
  };
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
            <MiddleItemPart to="/" isSaved={isSaved}>
              {showUnsavedHighlight()}
              {operationName}
              {showUnsavedHighlight()}
            </MiddleItemPart>
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
