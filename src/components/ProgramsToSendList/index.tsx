import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CodeBlock } from 'components/CodePreview/styles';

import {
  mountGCodeWithProgramNumber,
  orderedContours,
  getToolId,
} from 'integration/mount-gcode';
import { loadConfig } from 'utils/loadConfig';

import { Part, ContourItem } from 'types/part';
import { Config } from 'types/api';

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
  const [rangeStart, setRangeStart] = useState<number>(0);
  const part = useSelector((state: { part: Part }) => state.part);

  const handleContourClick = (contourId: number) => {
    setSelectedContourId(contourId === selectedContourId ? null : contourId);
  };

  useEffect(() => {
    async function fetchData() {
      const loadedConfig: Config = await loadConfig();
      setRangeStart(loadedConfig.cnc.delRangeStart);
    }
    fetchData();
  }, []);

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
                <ProgramNumber>
                  O{Number(rangeStart) + Number(index)}
                </ProgramNumber>
                {': '}
                {contour.name}
              </DropdownButtonText>
            </DropdownButton>
            {selectedContourId === contour.id && (
              <DropdownContent>
                <CodeBlock>
                  {mountGCodeWithProgramNumber(
                    contour,
                    Number(rangeStart) + Number(index),
                    getToolId(part, contour.id),
                  )}
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
