import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mountGCode } from 'integration/mount-gcode';

import { colors } from 'styles/global.styles';
import { Part } from 'types/part';
import {
  MenuContainer,
  Menu,
  List,
  ListItem,
  StyledLink,
  ItemBtn,
  StyledIcon,
} from './styles';

const SideMenu: React.FC = () => {
  const part = useSelector((state: { part: Part }) => state.part);
  const [loaded, setLoaded] = useState(false);

  const generateGCodeForOperations = async () => {
    const generatedCodes: String[] = [];

    part.operations.forEach((operation) => {
      operation.contoursIds.forEach((contourId) => {
        const operationContour = part.contours.find(
          (contour) => contour.id === contourId,
        );
        if (operationContour) {
          // Resolver problema do ID repetido do mesmo contorno em operations diferentes
          const gCode = mountGCode(operationContour);
          generatedCodes.push(gCode);
        }
      });
    });

    const response =
      await window.electron.ipcRenderer.saveGCode(generatedCodes);

    console.log('response', response);
  };

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
            <ItemBtn onClick={() => generateGCodeForOperations()}>
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
