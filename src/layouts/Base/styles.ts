import styled from 'styled-components';
import { fonts, colors } from 'styles/global.styles';

export const LayoutContainer = styled.div`
  font-family: ${fonts.primary};
`;

export const PageContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const Page = styled.div`
  border-top: 1px solid ${colors.greyMedium};
  flex-grow: 1;
`;
