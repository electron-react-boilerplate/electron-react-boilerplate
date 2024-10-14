import styled from 'styled-components';

import Input from 'components/Input';

import { colors } from 'styles/global.styles';

export const Field = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const SInput = styled(Input)`
  flex-grow: 1;

  & input {
    &::placeholder {
      color: ${colors.greyDark};
      font-style: italic;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Message = styled.label`
  font-size: 14px;
  color: ${colors.red};
`;

export const EditButton = styled.button`
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
`;
