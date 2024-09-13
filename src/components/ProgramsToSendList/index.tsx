import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CodeBlock } from 'components/CodePreview/styles';

import { generateGCodeForPart } from 'integration/mount-gcode';

import { Part, ContourItem } from 'types/part';

import { colors } from 'styles/global.styles';
import {
  Container,
  List,
  ListItem,
  DropdownButton,
  DropdownContent,
  IconWrapper,
  StyledIcon,
} from './styles';

const ProgramsToSendList: React.FC = () => {
  const [selectedContourId, setSelectedContourId] = useState<number | null>(
    null,
  );
  const part = useSelector((state: { part: Part }) => state.part);

  const gCodeList = generateGCodeForPart(part);

  const handleContourClick = (contourId: number) => {
    setSelectedContourId(contourId === selectedContourId ? null : contourId);
  };

  // Usar mesma função usada em mountGCode pra facilitar a manutenção pls
  // Ordenar os contornos com base na ordem das operações e contoursIds
  const orderedContours = part.operations
    .flatMap((operation) => operation.contoursIds)
    .map((contourId) =>
      part.contours.find((contour) => contour.id === contourId),
    )
    .filter((contour) => contour !== undefined) as ContourItem[];

  return (
    <Container>
      <List>
        {orderedContours.map((contour: ContourItem, index: number) => (
          <ListItem key={contour.id}>
            <DropdownButton onClick={() => handleContourClick(contour.id)}>
              <IconWrapper isOpen={selectedContourId === contour.id}>
                <StyledIcon
                  className="icon-expand_less"
                  color={colors.greyFont}
                  fontSize="22px"
                />
              </IconWrapper>
              {contour.name}
            </DropdownButton>
            {selectedContourId === contour.id && (
              <DropdownContent>
                <CodeBlock>{gCodeList[index]}</CodeBlock>
              </DropdownContent>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProgramsToSendList;
