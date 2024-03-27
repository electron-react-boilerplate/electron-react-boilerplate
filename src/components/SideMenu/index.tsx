import React from 'react';
import { MenuContainer, Menu, List, Item } from './styles';

const SideMenu: React.FC = () => {
  return (
    <MenuContainer>
      <Menu>
        <List>
          <li>
            <Item to="/workgroup">Grupo de Trabalho</Item>
          </li>
          <li>
            <Item to="/">Visualização</Item>
          </li>
        </List>
        <List>
          <li>
            <Item to="/preview">Code Preview</Item>
          </li>
          <li>
            <Item to="/">Exportar</Item>
          </li>
        </List>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
