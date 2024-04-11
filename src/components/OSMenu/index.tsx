import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { replaceOperation } from 'state/operations/operationsSlice';
import { editApp } from 'state/app/appSlice';
import { Part, Operations } from 'types/part';
import { App } from 'types/app';

import {
  Button,
  SubButton,
  Container,
  Menu,
  SubMenu,
  Hr,
  SubButtonLabel,
} from './styles';

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const lastFilePath = useSelector(
    (state: { app: App }) => state.app.lastFilePathSaved,
  );
  const operationState = useSelector((state: Part) => state.operations);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openFile = async () => {
    try {
      // change type to Part in the future
      const file: any = await window.electron.ipcRenderer.openFile();
      if (file) {
        dispatch(replaceOperation(file.data));
        dispatch(
          editApp({
            isSaved: true,
            lastFilePathSaved: file.path,
            lastSavedFileState: JSON.stringify(file.data),
          }),
        );
      }
    } catch (error: any) {
      alert('Erro ao abrir o arquivo', error);
      console.error(error);
    }
  };

  const saveFileAs = async (data: Operations) => {
    try {
      const file: any = await window.electron.ipcRenderer.saveFileAs(
        JSON.stringify(data),
      );
      if (file) {
        dispatch(
          editApp({
            isSaved: true,
            lastFilePathSaved: file,
            lastSavedFileState: JSON.stringify(operationState),
          }),
        );
      }
    } catch (error: any) {
      alert('Erro ao salvar o arquivo', error);
      console.error(error);
    }
  };

  const saveFile = async (data: Operations) => {
    if (lastFilePath) {
      try {
        const file = await window.electron.ipcRenderer.saveFile(
          JSON.stringify(data),
          lastFilePath,
        );
        if (file.success) {
          dispatch(dispatch(editApp({ isSaved: true })));
        } else {
          alert('Erro ao ler arquivo', file.message);
          console.error(file.message, `lasfilepath: ${lastFilePath}`);
        }
      } catch (error: any) {
        alert('Erro ao salvar o arquivo', error);
        console.error(error);
      }
    } else {
      saveFileAs(data);
    }
  };

  useEffect(() => {
    const handleShortcutO = () => openFile();
    const handleShortcutS = () => saveFile(operationState);
    const handleShortcutShiftS = () => saveFileAs(operationState);

    window.electron.ipcRenderer.on('shortcut-pressed-o', handleShortcutO);
    window.electron.ipcRenderer.on('shortcut-pressed-s', handleShortcutS);
    window.electron.ipcRenderer.on(
      'shortcut-pressed-shift-s',
      handleShortcutShiftS,
    );

    return () => {
      window.electron.ipcRenderer.removeListener(
        'shortcut-pressed-o',
        handleShortcutO,
      );
      window.electron.ipcRenderer.removeListener(
        'shortcut-pressed-s',
        handleShortcutS,
      );
      window.electron.ipcRenderer.removeListener(
        'shortcut-pressed-shift-s',
        handleShortcutShiftS,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (lastFilePath) dispatch(editApp({ lastFilePathSaved: lastFilePath }));
  }, [dispatch, lastFilePath]);

  return (
    <Container>
      <Menu ref={menuRef}>
        <li>
          <Button onClick={toggleMenu}>Arquivo</Button>
          {isOpen && (
            <SubMenu>
              <SubButton onClick={() => openFile()}>
                Abrir<SubButtonLabel>Ctrl + O</SubButtonLabel>
              </SubButton>
              <SubButton onClick={() => saveFile(operationState)}>
                Salvar<SubButtonLabel>Ctrl + S</SubButtonLabel>
              </SubButton>
              <SubButton onClick={() => saveFileAs(operationState)}>
                Salvar como...<SubButtonLabel>Ctrl + Shift + N</SubButtonLabel>
              </SubButton>
              <Hr />
              <SubButton onClick={() => window.electron.ipcRenderer.quitApp()}>
                Sair<SubButtonLabel>Ctrl + Q</SubButtonLabel>
              </SubButton>
            </SubMenu>
          )}
        </li>
      </Menu>
    </Container>
  );
};

export default OSMenu;
