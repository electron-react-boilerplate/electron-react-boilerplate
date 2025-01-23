import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CodeBlock } from 'components/CodePreview/styles';

import {
  mountGCodeWithProgramNumber,
  orderedContours,
  getOperationData,
} from 'integration/mount-gcode';
import { loadConfig } from 'utils/loadConfig';
import { loadTools } from 'utils/loadTools';

import { Part, ContourItem } from 'types/part';
import { Config, GetToolsResponseData } from 'types/api';

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
  const [loadedTools, setLoadedTools] = useState<GetToolsResponseData>([]);
  const part = useSelector((state: { part: Part }) => state.part);

  const handleContourClick = (contourId: number) => {
    setSelectedContourId(contourId === selectedContourId ? null : contourId);
  };

  useEffect(() => {
    async function fetchData() {
      const loadedConfig: Config = await loadConfig();
      const getTools: GetToolsResponseData = await loadTools();
      setRangeStart(loadedConfig.cnc.delRangeStart);
      setLoadedTools(getTools);
    }
    fetchData();
  }, []);

  const mountCodeBlock = (contour: ContourItem, index: number) => {
    const toolId = getOperationData(part, contour.id, (op) => op.toolId);
    return mountGCodeWithProgramNumber(
      contour,
      Number(rangeStart) + Number(index),
      toolId,
      loadedTools[toolId - 1].value,
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
                  O{Number(rangeStart) + Number(index)}
                </ProgramNumber>
                {': '}
                {contour.name}
              </DropdownButtonText>
            </DropdownButton>
            {selectedContourId === contour.id && (
              <DropdownContent>
                <CodeBlock>{mountCodeBlock(contour, index)}</CodeBlock>
              </DropdownContent>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProgramsToSendList;
