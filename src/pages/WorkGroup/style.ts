import styled from 'styled-components';

import { PageTitle, PageContent, ContentBlock } from 'styles/Components';

export const Container = styled.div`
  height: 100%;
`;

export const Block = styled.div`
  width: 100%;
`;

export const Content = styled(PageContent)`
  display: flex;
  flex-flow: row nowrap;
  gap: 18px;
  height: 100%;
  max-height: calc(100vh - 308px);
`;

export const OperationsWrapper = styled.div`
  max-height: calc(100vh - 308px);
  overflow-y: auto;
`;

export const CContentBlock = styled(ContentBlock)`
  height: calc(100vh - 308px);
  overflow: visible;
`;

export const SContentBlock = styled(ContentBlock)`
  margin-bottom: 15px;
`;

export const Title = styled(PageTitle)``;

export const AddBtn = styled.div`
  height: 48px;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

export const TextAdd = styled.p`
  margin-left: 5px;
  line-height: 100%;
  font-size: 18px;
`;
