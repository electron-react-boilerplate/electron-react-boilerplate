import styled from 'styled-components';
import Input from 'components/Input';
import { PageContent, PageTitle, ContentBlock } from 'styles/Components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled(PageContent)``;

export const Title = styled(PageTitle)`
  display: block;
  padding: 0;
`;

export const SContentBlock = styled(ContentBlock)`
  margin-bottom: 20px;
`;

export const SInput = styled(Input)`
  margin-bottom: 20px;
`;
