// ConfirmAction.tsx
import React from 'react';

import Button from 'components/Button';
import { colors } from 'styles/global.styles';

import { ConfirmActionProps } from './interface';
import { Container, Text } from './style';

const ConfirmAction: React.FC<ConfirmActionProps> = ({
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  variation = 'danger',
}) => (
  <Container>
    <Button
      onClick={onConfirm}
      color={colors.white}
      bgColor={variation === 'standard' ? colors.blue : colors.red}
    >
      <Text>{confirmText}</Text>
    </Button>
    <Button
      onClick={onCancel}
      color={colors.blue}
      bgColor={colors.white}
      borderColor={colors.blue}
    >
      <Text>{cancelText}</Text>
    </Button>
  </Container>
);

export default ConfirmAction;
