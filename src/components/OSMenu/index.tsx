import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { replaceOperation } from 'state/operations/operationsSlice';
import { Operations } from 'types/part';

import { Button, SubButton, Container, Menu, SubMenu, Hr } from './styles';

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      const save: any = await window.electron.ipcRenderer
        .saveFileAs(JSON.stringify(data))
        .then((res: any) => {
          return res;
        });
      if (save) console.log('Arquivo salvo com sucesso');
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

  return (
    <Container>
      <Menu ref={menuRef}>
        <li>
          <Button onClick={toggleMenu}>Arquivo</Button>
          {isOpen && (
            <SubMenu>
              <SubButton onClick={() => openFile()}>Abrir</SubButton>
              <SubButton>Salvar</SubButton>
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
