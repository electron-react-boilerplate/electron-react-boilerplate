import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { CodeBlock } from 'components/CodePreview/styles';

import {
  mountGCodeWithProgramNumber,
  orderedContours,
} from 'integration/mount-gcode';

import { Part, ContourItem } from 'types/part';

import { colors } from 'styles/global.styles';
import {
  Container,
  List,
  ListItem,
  DropdownButton,
  DropdownContent,
  IconWrapper,
  ProgramNumber,
  IconExpand,
  DropdownButtonText,
} from './styles';

const ProgramsToSendList: React.FC = () => {
  const [selectedContourId, setSelectedContourId] = useState<number | null>(
    null,
  );
  const part = useSelector((state: { part: Part }) => state.part);

  const handleContourClick = (contourId: number) => {
    setSelectedContourId(contourId === selectedContourId ? null : contourId);
  };

  return (
    <Container>
      <List>
        {orderedContours(part).map((contour: ContourItem, index: number) => (
          <ListItem key={contour.id}>
            <DropdownButton onClick={() => handleContourClick(contour.id)}>
              <IconWrapper isOpen={selectedContourId === contour.id}>
                <IconExpand
                  className="icon-expand_less"
                  color={colors.black}
                  fontSize="18px"
                />
              </IconWrapper>
              <DropdownButtonText>
                <ProgramNumber>O{1000 + index}</ProgramNumber>
                {': '}
                {contour.name}
              </DropdownButtonText>
            </DropdownButton>
            {selectedContourId === contour.id && (
              <DropdownContent>
                <CodeBlock>
                  {mountGCodeWithProgramNumber(contour, 1000 + index)}
                </CodeBlock>
              </DropdownContent>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProgramsToSendList;
