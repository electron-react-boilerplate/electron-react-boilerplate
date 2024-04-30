import styled from 'styled-components';
import { PageTitle, PageContent } from 'styles/Components';
import { colors } from 'styles/global.styles';
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
`;

export const AddBtn = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 100%;
  text-decoration: none;
  background-color: ${colors.blue};
  color: ${colors.white};
  margin-bottom: 15px;
  font-size: 16px;
  border-radius: 5px;
`;

export const TextAdd = styled.p`
  margin-left: 5px;
  line-height: 100%;
  font-size: 18px;
`;

export const IconAdd = styled.span`
  font-size: 26px;
  color: ${colors.white};
`;
