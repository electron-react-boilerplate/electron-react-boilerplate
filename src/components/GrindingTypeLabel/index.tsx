import React from 'react';

import { TYPE_EXTERNAL, TYPE_INTERNAL } from 'utils/constants';

import { GrindingTypeLabelProps } from './interface';
import { Container } from './style';

const getContourTypeLabel = (type: number) => {
  if (type === TYPE_EXTERNAL) return 'Externo';
  if (type === TYPE_INTERNAL) return 'Interno';
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
