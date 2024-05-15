import React from 'react';

import { IconProps } from './interface';
import { IconWrapper } from './style';

const Icon: React.FC<IconProps> = ({ className, color, fontSize }) => {
  return (
    <IconWrapper className={className} color={color} fontSize={fontSize} />
  );
};

export default Icon;
