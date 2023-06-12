import { Input } from 'rsuite';
import styled from 'styled-components';

export const InputSearch = styled(Input)`
  outline: none;
  border: 1px solid ${({ theme }) => theme.red};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.secondary};
    outline: none;
  }
`;
