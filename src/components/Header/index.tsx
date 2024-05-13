import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import OSMenu from 'components/OSMenu';

import { Link } from 'styles/Components';
import { colors } from 'styles/global.styles';

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
  StyledIcon,
} from './styles';

const Header: React.FC = () => {
  const isSaved = useSelector(
    (state: { app: { isSaved: boolean } }) => state.app.isSaved,
  );
  // Usar nome do arquivo instead
  const partName = useSelector((state: { part: Part }) => state.part.name);
  const showUnsavedHighlight = () => {
    if (!isSaved) return '*';
    return '';
  };
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div>
      <OSMenu />
      <AppMenu className={loaded ? 'loaded' : ''}>
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
              {partName}
              {showUnsavedHighlight()}
            </MiddleItemPart>
          </Middle>
        </Menu>
        <Link to="/">
          <StyledIcon
            className="icon-more_vert"
            color={colors.greyFont}
            fontSize="28px"
          />
        </Link>
      </AppMenu>
    </div>
  );
};

export default Header;
