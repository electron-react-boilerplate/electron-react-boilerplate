import styled from 'styled-components';
import { colors, shadows, measures } from 'styles/global.styles';

export const Block = styled.div`
  overflow-y: auto;
  background-color: ${colors.grey};
  width: 100%;
  height: 100%;
  max-height: calc(100vh - ${measures.contentToHeader});
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: ${shadows.std};
  border-radius: ${measures.borderRadius};
`;
