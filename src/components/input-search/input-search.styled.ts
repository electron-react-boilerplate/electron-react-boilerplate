import { InputGroup } from 'rsuite';
import styled from 'styled-components';

export const InputSearch = styled(InputGroup)`
  &,
  input {
    outline: none;

    &:focus,
    &:hover {
      outline: none !important;
      border-color: none !important;
      box-shadow: inset 0px 0px 1px 1px ${({ theme }) => theme.primary};
    }
  }
`;
