import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Operations } from 'types/part';

import { Button, SubButton, Container, Menu, SubMenu, Hr } from './styles';

const openFile = () => {
  window.electron.ipcRenderer
    .openFile()
    .then((data: string) => {
      console.log(data);
      return data;
    })
    .catch((error: Error) => {
      console.error(error);
      throw error;
    });
};

const saveFileAs = (content: Operations) => {
  const stringContent = JSON.stringify(content);
  window.electron.ipcRenderer
    .saveFileAs(stringContent)
    // eslint-disable-next-line promise/always-return
    .then(() => {
      console.log('Arquivo salvo com sucesso');
    })
    .catch((error: Error) => {
      console.error(error);
      throw error;
    });
};

const OSMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLElement | null>(null);

  const reduxState = useSelector((state: Operations) => state);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
