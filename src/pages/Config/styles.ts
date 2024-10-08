import styled from 'styled-components';
import Input from 'components/Input';

import { colors } from 'styles/global.styles';

import {
  PageContent,
  PageTitle,
  ContentBlock,
  SubTitle,
} from 'styles/Components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled(PageContent)`
  max-height: calc(100vh - 155px);
  overflow-y: auto;
`;

export const Title = styled(PageTitle)`
  display: block;
  padding: 0;
`;

export const SContentBlock = styled(ContentBlock)`
  margin-bottom: 20px;
`;

export const SSubTitle = styled(SubTitle)`
  display: block;
  padding: 0;
`;

export const SInput = styled(Input)`
  margin-bottom: 12px;

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
