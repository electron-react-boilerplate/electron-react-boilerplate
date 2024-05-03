import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Part, ContourItem } from 'types/part';
import { mountGCode } from 'integration/mount-gcode';
import { MenuContainer, Menu, List, Item, ItemBtn } from './styles';

const generateGCode = (stateValue: ContourItem) => {
  window.electron.ipcRenderer.saveGCode(mountGCode(stateValue));
};

const SideMenu: React.FC = () => {
  const stateValue = useSelector(
    (state: { part: Part }) => state.part.contours[0],
  );
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <MenuContainer>
      <Menu className={loaded ? 'loaded' : ''}>
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
