import Icon from 'components/Icon';
import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 50%;
  max-width: 550px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 18px;
  align-items: center;
`;

export const TitleIconWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  margin-right: 10px;
`;

export const Title = styled.h2<{ variation?: string }>`
  font-size: 30px;
  font-weight: bold;
  color: ${(props) =>
    props.variation === 'danger' ? colors.red : colors.greyFont};
`;

export const IconClose = styled.span`
  font-size: 30px;
  color: ${colors.greyFont};
`;

export const Content = styled.div``;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  margin: 0;
`;
