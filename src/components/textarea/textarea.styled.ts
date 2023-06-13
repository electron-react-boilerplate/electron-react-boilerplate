import { Input } from 'rsuite';
import styled from 'styled-components';

export const InputTextArea = styled(Input)`
  background-color: ${({ theme }) => theme.black};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.gray};
  height: 100%;
  outline: none;
  padding: 5px 10px;
  width: 100%;
`;
