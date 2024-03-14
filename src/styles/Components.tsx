import { Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';

import { colors } from 'styles/global.styles';

export const Link = styled(LinkRouter)`
  text-decoration: none;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.grey};
    opacity: 0.6;
  }
`;
