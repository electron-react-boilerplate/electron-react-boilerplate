import styled from 'styled-components';
import { colors } from 'styles/global.styles';
import { Link } from 'styles/Components';

export const Container = styled.div`
  padding: 24px;
  border-bottom: 1px solid ${colors.greyMedium};
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

export const LogoText = styled.p`
  cursor: default;
`;

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

export const MiddleItemHome = styled.div`
  cursor: pointer;
  padding-left: 24px;
  border-left: 1px solid ${colors.greyMedium};
  font-size: 20px;
  line-height: 34px;
  color: ${colors.greyFont};
`;

export const MiddleItemHomeLink = styled(Link)`
  padding: 8px;
`;

export const MiddleItemPart = styled(Link)`
  cursor: pointer;
  color: ${colors.blue};
  font-size: 18px;
  padding: 8px;
  margin-right: 46px;
`;

export const Icon = styled(Link)`
  color: ${colors.greyFont};
  font-size: 28px;
`;
