import React from 'react';
import ConfirmAction from 'components/ConfirmAction';
import Modal from 'components/Modal';

import { ModalCloseAppProps } from './interface';
import { Text } from './style';

const ModalCloseApp: React.FC<ModalCloseAppProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Confirmar Saída"
    variation="danger"
  >
    <Text>
      Você tem certeza que deseja sair? Todas as alterações não salvas serão
      perdidas.
    </Text>
    <ConfirmAction
      confirmText="Sair"
      cancelText="Cancelar"
      onConfirm={onConfirm}
      onCancel={onClose}
      variation="danger"
    />
  </Modal>
);

export default ModalCloseApp;
