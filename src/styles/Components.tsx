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

export const ContentBlock = styled.div`
  background-color: ${colors.grey};
  width: 100%;
  height: 100%;
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px -3px rgba(0, 0, 0, 0.2);
`;
