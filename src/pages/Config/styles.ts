import styled from 'styled-components';
import Input from 'components/Input';

import { colors } from 'styles/global.styles';

import { ContentBlock, SubTitle } from 'styles/Components';
import Button from 'components/Button';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const SContentBlock = styled(ContentBlock)`
  margin-bottom: 20px;
  max-height: 100%;
`;

export const SideBySideContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const Side = styled.div`
  width: 50%;
`;

export const ContentText = styled.div<{ color: string }>`
  padding: 15px;
  font-size: 18px;
  box-sizing: border-box;
  min-width: 150px;
  height: 53px;
  background-color: ${colors.white};
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  text-align: center;
`;

export const SButton = styled(Button)`
  width: auto;
  align-self: flex-start;
`;

export const SSubTitle = styled(SubTitle)`
  display: block;
  padding: 0;
`;

export const Field = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 12px;
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
