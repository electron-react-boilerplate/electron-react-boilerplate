import React from 'react';
import { StyledButton } from './style';

interface LinkProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LinkAction: React.FC<LinkProps> = ({ children, onClick }) => {
  return (
    <StyledButton
      type="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </StyledButton>
  );
};

export default LinkAction;
