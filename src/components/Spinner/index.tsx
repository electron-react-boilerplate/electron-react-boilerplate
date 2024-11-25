import React from 'react';
import { colors } from 'styles/global.styles';
import { Container, Spinner } from './styles';

const LoadingSpinner: React.FC<{ color?: string }> = ({ color }) => (
  <Container>
    <Spinner color={color} />
  </Container>
);

LoadingSpinner.defaultProps = {
  color: colors.white, // replace 'defaultColor' with your desired default color
};

export default LoadingSpinner;
