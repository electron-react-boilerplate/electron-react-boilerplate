import { colors } from 'styles/global.styles';
import styled from 'styled-components';

export const Link = styled.a`
  text-decoration: none;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.grey};
    opacity: 0.6;
  }
`;
