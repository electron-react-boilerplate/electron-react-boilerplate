import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mountGCode } from 'integration/mount-gcode';

import { colors } from 'styles/global.styles';
import { Part, ContourItem } from 'types/part';
import {
  MenuContainer,
  Menu,
  List,
  ListItem,
  StyledLink,
  ItemBtn,
  StyledIcon,
} from './styles';

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
          <ListItem>
            <StyledLink to="/workgroup">
              <StyledIcon
                className="icon-make-group"
                color={colors.white}
                fontSize="28px"
              />
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/">
              <StyledIcon
                className="icon-remove_red_eye"
                color={colors.white}
                fontSize="28px"
              />
            </StyledLink>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ItemBtn onClick={() => generateGCode(stateValue)}>
              <StyledIcon
                className="icon-double_arrow"
                color={colors.white}
                fontSize="28px"
              />
            </ItemBtn>
          </ListItem>
        </List>
      </Menu>
    </MenuContainer>
  );
};

export default SideMenu;
