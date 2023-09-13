import { Input } from 'rsuite';
import styled from 'styled-components';

export const InputTextArea = styled(Input)`
  background-color: ${({ theme }) => theme.black};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.gray};
  height: calc(100% - 68px);
  min-height: 328px;
  outline: none;
  padding: 5px 10px;
  width: 100%;
`;
