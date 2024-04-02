import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)``;

export const Title = styled(PageTitle)``;

export const CodeBlock = styled.pre`
  overflow-y: auto;
  background-color: ${colors.greyCodeBg};
  color: ${colors.blueCodeFont};
  width: 100%;
  height: calc(100vh - 255px);
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.4);
  font-family: Consolas, monospace;
  font-size: 16px;
  line-height: 1.3;
  border-radius: 4px;
`;
