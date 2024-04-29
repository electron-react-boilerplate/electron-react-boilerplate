import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors, shadows } from 'styles/global.styles';
// import { colors } from 'styles/global.styles';

export const Container = styled.div`
  height: 100%;
`;

export const Content = styled(PageContent)`
  display: flex;
  flex-flow: row nowrap;
  gap: 18px;
  height: 100%;
  max-height: calc(100vh - 190px);
`;

export const Title = styled(PageTitle)``;

export const Block = styled.div`
  width: 100%;
  position: relative;
`;

export const AddBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 48px;
  text-decoration: none;
  background-color: ${colors.blue};
  box-shadow: ${shadows.strong};
  position: absolute;
  bottom: 0;
  right: 12px;
  transform: translate(-50%, -50%);
`;

export const IconAdd = styled.span`
  font-size: 36px;
  color: ${colors.white};
`;
