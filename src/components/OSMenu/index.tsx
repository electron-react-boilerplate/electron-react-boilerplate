import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { replaceOperation } from 'state/operations/operationsSlice';
import { replaceApp } from 'state/app/appSlice';
import { Operations } from 'types/part';

import { Button, SubButton, Container, Menu, SubMenu, Hr } from './styles';

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastFilePath, setLastFilePath] = useState<string>('');
  const menuRef = useRef<HTMLElement | null>(null);

  const reduxState = useSelector((state: Operations) => state);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // TODO padronizar funções IPC no main.ts

  const openFile = async () => {
    try {
      // change type to Part in the future
      const data: any = await window.electron.ipcRenderer
        .openFile()
        // change type to Part in the future
        .then((res: any) => {
          return res;
        });
      if (data) dispatch(replaceOperation(data.operations));
    } catch (error: any) {
      console.error(error);
    }
  };

  const saveFileAs = async (data: Operations) => {
    try {
      const filePath: any = await window.electron.ipcRenderer.saveFileAs(
        JSON.stringify(data),
      );
      if (filePath) {
        setLastFilePath(filePath);
        console.log('Arquivo salvo com sucesso');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  const saveFile = async (data: Operations) => {
    try {
      const response = await window.electron.ipcRenderer.saveFile(
        JSON.stringify(data),
        lastFilePath,
      );
      if (response.success) {
        console.log(response.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

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
    if (lastFilePath) dispatch(replaceApp({ lastFilePathSaved: lastFilePath }));
  }, [dispatch, lastFilePath]);

  return (
    <Container>
      <Menu ref={menuRef}>
        <li>
          <Button onClick={toggleMenu}>Arquivo</Button>
          {isOpen && (
            <SubMenu>
              <SubButton onClick={() => openFile()}>Abrir</SubButton>
              <SubButton onClick={() => saveFile(reduxState)}>Salvar</SubButton>
              <SubButton onClick={() => saveFileAs(reduxState)}>
                Salvar como...
              </SubButton>
              <Hr />
              <SubButton>Sair</SubButton>
            </SubMenu>
          )}
        </li>
      </Menu>
    </Container>
  );
};

export default OSMenu;
