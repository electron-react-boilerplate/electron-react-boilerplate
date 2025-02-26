import { Link as LinkRouter } from 'react-router-dom';
import styled from 'styled-components';

import { colors, measures, shadows } from 'styles/global.styles';

export const Link = styled(LinkRouter)`
  text-decoration: none;

  &:hover {
    color: ${colors.blue};
    background-color: ${colors.grey};
    opacity: 0.6;
  }
`;

export const LinkAction = styled.button`
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
  color: ${colors.greyFont};
  margin: 0;
  margin-bottom: ${measures.gutter};
  line-height: 40px;
`;

export const SubTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 24px;
  color: ${colors.greyFont};
`;

export const PageContent = styled.div`
  padding: 15px 24px;
`;

export const ContentBlock = styled.div`
  overflow-y: auto;
  background-color: ${colors.grey};
  width: 100%;
  max-height: calc(100vh - ${measures.contentToHeader});
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: ${shadows.std};
  border-radius: ${measures.borderRadius};
`;
