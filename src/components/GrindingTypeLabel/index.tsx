import React from 'react';

import { GrindingTypeLabelProps } from './interface';
import { Container } from './style';

const GrindingTypeLabel: React.FC<GrindingTypeLabelProps> = ({
  contourType,
  fontSize,
}) => {
  return <Container fontSize={fontSize}>{contourType}</Container>;
};

export default GrindingTypeLabel;
