import React from 'react';
import { Container } from './style';

interface InfoLabelProps {
  fontSize: string;
  color: string;
  children: React.ReactNode;
}
const InfoLabel: React.FC<InfoLabelProps> = ({ fontSize, color, children }) => {
  return (
    <Container fontSize={fontSize} color={color}>
      {children}
    </Container>
  );
};

export default InfoLabel;
