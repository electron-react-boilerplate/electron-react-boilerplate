import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Block = styled.div`
  overflow-y: auto;
  background-color: ${colors.grey};
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 255px);
  padding: 15px 10px;
  box-sizing: border-box;
  box-shadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
`;
