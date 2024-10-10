import React from 'react';

import { ButtonProps } from './interface';
import { StyledButton } from './style';

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  color,
  bgColor,
  borderColor = 'transparent',
}) => (
  <StyledButton
    type={type}
    color={color}
    bgColor={bgColor}
    borderColor={borderColor}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default Button;
