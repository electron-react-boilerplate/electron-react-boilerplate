import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import OSMenu from 'components/OSMenu';
import MoreMenu from 'components/MoreMenu';

import { MenuItem } from 'components/MoreMenu/interface';

import { editApp } from 'state/app/appSlice';

import logo from '../../../assets/images/zema-logo.png';

import {
  AppMenu,
  Logo,
  Menu,
  Middle,
  MiddleItemHome,
  MiddleItemHomeLink,
  MiddleItemPart,
  MiddleItemPartSpan,
} from './styles';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSaved = useSelector(
    (state: { app: { isSaved: boolean } }) => state.app.isSaved,
  );
  const fileName = useSelector(
    (state: { app: { fileName: string } }) => state.app.fileName,
  );

  const [loaded, setLoaded] = useState(false);
  const [fileStatus, setFileStatus] = useState<boolean>(true);
  const lastFilePath = useSelector(
    (state: { app: { lastFilePathSaved: string | undefined } }) =>
      state.app.lastFilePathSaved,
  );

  const showUnsavedHighlight = () => {
    if (!isSaved) return '*';
    return '';
  };

  const startFileExistenceCheck = useCallback(
    (filePath: string | undefined) => {
      if (!filePath) return;

      const checkInterval = 1000;

      const intervalId = setInterval(async () => {
        const result = await window.electron.ipcRenderer.checkFile(filePath);
        // refatorar essa parte para o fileStatus ser um state do redux e não do componente
        setFileStatus(result);

        if (!result) {
          dispatch(
            editApp({
              isSaved: false,
              lastFilePathSaved: undefined,
              lastSavedFileState: undefined,
            }),
          );
          clearInterval(intervalId);
        }

        setLoaded(true);
      }, checkInterval);
    },
    [dispatch],
  );

  const moreMenuItems: MenuItem[] = [
    {
      name: 'Configurações',
      action: () => {
        navigate('/config');
      },
    },
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (lastFilePath) {
      startFileExistenceCheck(lastFilePath);
    }
  }, [lastFilePath, startFileExistenceCheck]);

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
              {fileStatus ? (
                <>
                  {showUnsavedHighlight()}
                  {fileName}
                  {showUnsavedHighlight()}
                </>
              ) : (
                <MiddleItemPartSpan>{fileName}</MiddleItemPartSpan>
              )}
            </MiddleItemPart>
          </Middle>
        </Menu>
        <MoreMenu menuItems={moreMenuItems} />
      </AppMenu>
    </div>
  );
};

export default Header;
