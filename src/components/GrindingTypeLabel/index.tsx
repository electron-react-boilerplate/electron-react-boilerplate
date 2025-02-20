import React from 'react';

import InfoLabel from 'components/InfoLabel';

import { TYPE_EXTERNAL, TYPE_INTERNAL } from 'utils/constants';

import { colors } from 'styles/global.styles';

import { GrindingTypeLabelProps } from './interface';

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
    <InfoLabel fontSize={fontSize} color={colors.blue}>
      {getContourTypeLabel(contourType)}
    </InfoLabel>
  );
};

export default GrindingTypeLabel;
