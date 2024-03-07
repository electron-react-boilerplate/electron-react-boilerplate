import styled from 'styled-components';
import { colors } from 'styles/global.styles';

export const Container = styled.div`
  padding: 24px;
  border: 1px solid ${colors.greyMedium};
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 34px;
  font-weight: bold;
  color: ${colors.greyLogo};
  margin-right: 24px;
  width: 121px;
  text-align: left;
`;

export const Menu = styled.div`
  flex-grow: 1;
`;

export const LogoText = styled.p``;

export const LogoTextG = styled.span`
  color: ${colors.blue};
`;

export const Middle = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
`;

export const MiddleItemHome = styled.a`
  cursor: pointer;
  padding-left: 24px;
  border-left: 1px solid ${colors.greyMedium};
  font-size: 20px;
  line-height: 34px;
  color: ${colors.greyFont};
`;

export const MiddleItemPart = styled.a`
  cursor: pointer;
  color: ${colors.blue};
  font-size: 18px;
  margin-right: 46px;
`;
