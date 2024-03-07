import React from 'react';
import { MenuContainer, Menu, MenuItem } from './styles';

const SideMenu: React.FC = () => {
  return (
    <MenuContainer>
      <Menu>
        <ul>
          <li>
            <MenuItem href="/">Grupo de Trabalho</MenuItem>
          </li>
          <li>
            <MenuItem href="/">Visualização</MenuItem>
          </li>
        </ul>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
