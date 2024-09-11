import React from 'react';

import Icon from 'components/Icon';

import { colors } from 'styles/global.styles';
import { ModalProps } from './interface';
import {
  Overlay,
  ModalContainer,
  CloseButton,
  Header,
  TitleIconWrapper,
  StyledIcon,
  Title,
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
          <TitleIconWrapper>
            {variation === 'danger' && (
              <StyledIcon
                className="icon-warning2"
                color={colors.red}
                fontSize="32px"
              />
            )}
            <Title variation={variation}>{title}</Title>
          </TitleIconWrapper>
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
