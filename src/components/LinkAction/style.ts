import styled from 'styled-components';
import { LinkAction } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const StyledButton = styled(LinkAction)`
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  color: ${colors.blue};
  font-weight: bold;
`;
