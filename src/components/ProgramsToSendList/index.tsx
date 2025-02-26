import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ToolOptionItem } from 'components/Select/interface';

import useFormattedTools from 'hooks/useFormattedTools';

import {
  mountGCodeWithProgramNumber,
  orderedContours,
  getOperationData,
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
  SCodeBlock,
} from './styles';

const ProgramsToSendList: React.FC = () => {
  const formattedTools = useFormattedTools();
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

  const mountCodeBlock = (contour: ContourItem, index: number) => {
    const toolId = getOperationData(part, contour.id, (op) => op.toolId);
    return mountGCodeWithProgramNumber(
      contour,
      Number(rangeStart) + Number(index),
      toolId,
      formattedTools.find((t: ToolOptionItem) => t.id === toolId)?.value ?? 0,
      getOperationData(part, contour.id, (op) => op.bAxisAngle),
      getOperationData(part, contour.id, (op) => op.xSafetyDistance),
      getOperationData(part, contour.id, (op) => op.zSafetyDistance),
    );
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
                <ProgramNumber>
                  {Number(rangeStart) + Number(index)}
                </ProgramNumber>
                {': '}
                {contour.name}
              </DropdownButtonText>
            </DropdownButton>
            {selectedContourId === contour.id && (
              <DropdownContent>
                <SCodeBlock>{mountCodeBlock(contour, index)}</SCodeBlock>
              </DropdownContent>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProgramsToSendList;
