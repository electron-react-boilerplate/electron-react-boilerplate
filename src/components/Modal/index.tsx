import React from 'react';

import Icon from 'components/Icon';

import { colors } from 'styles/global.styles';
import { ModalProps } from './interface';
import {
  Overlay,
  ModalContainer,
  CloseButton,
  Title,
  Header,
  Content,
} from './style';

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  variation,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title variation={variation}>{title}</Title>
          <CloseButton onClick={onClose}>
            <Icon className="icon-x" color={colors.greyFont} fontSize="30px" />
          </CloseButton>
        </Header>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
