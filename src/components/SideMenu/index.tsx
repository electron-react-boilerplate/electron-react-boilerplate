import React from 'react';
import { MenuContainer, Menu, List, Item } from './styles';

const SideMenu: React.FC = () => {
  return (
    <MenuContainer>
      <Menu>
        <List>
          <li>
            <Item href="/">Grupo de Trabalho</Item>
          </li>
          <li>
            <Item href="/">Visualização</Item>
          </li>
        </List>
        <List>
          <li>
            <Item href="/">Code Preview</Item>
          </li>
          <li>
            <Item href="/">Exportar</Item>
          </li>
        </List>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
