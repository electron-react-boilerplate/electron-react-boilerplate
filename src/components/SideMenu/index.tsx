import React from 'react';
import { useSelector } from 'react-redux';
import { Operations } from 'types/part';
import { mountGCode } from 'integration/mount-gcode';
import { MenuContainer, Menu, List, Item, ItemBtn } from './styles';

const generateGCode = (stateValue: Operations) => {
  window.electron.ipcRenderer.saveGCode(mountGCode(stateValue));
};

const SideMenu: React.FC = () => {
  const stateValue = useSelector(
    (state: { operations: Operations[] }) => state.operations[0],
  );
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
            <ItemBtn onClick={() => generateGCode(stateValue)}>
              Exportar
            </ItemBtn>
          </li>
        </List>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
