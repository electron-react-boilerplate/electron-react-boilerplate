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

export const PageTitle = styled.h1`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.greyFont};
`;

export const PageContent = styled.div`
  margin: 15px 24px;
`;
