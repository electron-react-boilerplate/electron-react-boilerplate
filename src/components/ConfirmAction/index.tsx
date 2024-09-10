// ConfirmAction.tsx
import React from 'react';

import Button from 'components/Button';
import { colors } from 'styles/global.styles';

import { ConfirmActionProps } from './interface';
import { Container, Text } from './style';

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  onConfirm,
  onCancel,
}) => (
  <Container>
    <Button onClick={onConfirm} color={colors.white} bgColor={colors.red}>
      <Text>Confirmar</Text>
    </Button>
    <Button
      onClick={onCancel}
      color={colors.blue}
      bgColor={colors.white}
      borderColor={colors.blue}
    >
      <Text>Cancelar</Text>
    </Button>
  </Container>
);

export default ConfirmAction;
