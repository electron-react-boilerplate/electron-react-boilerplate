import styled from 'styled-components';
import { colors } from 'styles/global.styles';

import Icon from 'components/Icon';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  border-bottom: 1px solid ${colors.greyMedium};
`;

export const DropdownButton = styled.button`
  font-size: 18px;
  background-color: ${colors.white};
  color: ${colors.blue};
  width: 100%;
  border: 0;
  padding: 16px 0;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
`;

export const DropdownContent = styled.div``;

export const IconWrapper = styled.div<{ isOpen: boolean }>`
  transition: transform 0.2s;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

export const StyledIcon = styled(Icon)`
  transform: rotate(90deg);
`;
