import React from 'react';

import { GrindingTypeLabelProps } from './interface';
import { Container } from './style';

const getContourTypeLabel = (type: number) => {
  if (type === 1) return 'Externo';
  if (type === 2) return 'Interno';
  return '';
};

const GrindingTypeLabel: React.FC<GrindingTypeLabelProps> = ({
  contourType,
  fontSize,
}) => {
  return (
    <Container fontSize={fontSize}>
      {getContourTypeLabel(contourType)}
    </Container>
  );
};

export default GrindingTypeLabel;
