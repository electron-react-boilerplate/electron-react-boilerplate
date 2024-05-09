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
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.greyFont};
`;

export const PageContent = styled.div`
  margin: 15px 24px;
`;

export const ContentBlock = styled.div`
  overflow-y: auto;
  background-color: ${colors.grey};
  width: 100%;
  max-height: calc(100vh - 255px);
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;
