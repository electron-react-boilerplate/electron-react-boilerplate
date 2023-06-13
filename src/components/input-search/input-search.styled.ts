import { InputGroup } from 'rsuite';
import styled from 'styled-components';

export const InputSearch = styled(InputGroup)`
  &,
  input {
    outline: none;

    &:focus,
    &:hover {
      outline: none;
    }
  }
`;
