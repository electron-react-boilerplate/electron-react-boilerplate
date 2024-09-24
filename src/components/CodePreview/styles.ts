import styled from 'styled-components';
import { colors, measures, shadows } from 'styles/global.styles';

export const CodeBlock = styled.pre`
  overflow-y: auto;
  background-color: ${colors.greyCodeBg};
  color: ${colors.blueCodeFont};
  width: 100%;
  max-height: calc(100vh - ${measures.contentToHeader});
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: ${shadows.std};
  font-family: Consolas, monospace;
  font-size: 16px;
  line-height: 1.3;
  border-radius: ${measures.borderRadius};
`;
