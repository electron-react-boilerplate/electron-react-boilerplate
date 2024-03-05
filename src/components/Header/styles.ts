import styled from 'styled-components';
import { colors, measures } from 'styles/global.styles';

export const HeaderContainer = styled.div`
  /* height: 60px; */
  padding: ${measures.gutter};
  border: 1px solid ${colors.greyMedium};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-size: 34px;
  font-weight: bold;
  color: ${colors.greyLogo};
`;

export const LogoG = styled.span`
  color: ${colors.blue};
`;
