import React from 'react';
import { useSelector } from 'react-redux';

import OSMenu from 'components/OSMenu';
import { Part } from 'types/part';

import logo from '../../../assets/images/zema-logo.png';

import {
  AppMenu,
  Logo,
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
  const contourName = useSelector((state: { part: Part }) => state.part.name);
  const showUnsavedHighlight = () => {
    if (!isSaved) return '*';
    return '';
  };
  return (
    <div>
      <OSMenu />
      <AppMenu>
        <Logo>
          <img src={logo} alt="Logo" />
        </Logo>
        <Menu>
          <Middle>
            <MiddleItemHome>
              <MiddleItemHomeLink to="/">Peças</MiddleItemHomeLink>
            </MiddleItemHome>
            <MiddleItemPart to="/" isSaved={isSaved}>
              {showUnsavedHighlight()}
              {contourName}
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
