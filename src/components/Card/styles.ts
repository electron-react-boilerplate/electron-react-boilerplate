import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows } from 'styles/global.styles';

export const Container = styled.div<{ isActive?: boolean }>`
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.greyMedium};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  opacity: ${(props) => (props.isActive ? 0.5 : 1)};
  height: 56px;
`;

export const ContentLeft = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const ContentRight = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const BaseButton = styled.button`
  flex-shrink: 0;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 100%;
`;

export const Drag = styled(BaseButton)`
  background-color: ${colors.white};
  cursor: grab;
  width: 36px;
`;

export const Toggle = styled(BaseButton)`
  text-align: center;
  background-color: ${colors.white};
  width: 36px;
`;

export const UpDownContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 56px;
`;

export const Up = styled(BaseButton)`
  background-color: ${colors.white};
  width: 56px;
`;

export const Down = styled(BaseButton)`
  background-color: ${colors.white};
  width: 56px;
`;

export const Name = styled.div<{ paddingLeft?: boolean }>`
  font-size: 18px;
  padding-left: ${(props) => (props.paddingLeft ? '16px' : 'none')};
`;

export const Edit = styled(BaseButton)`
  background-color: ${colors.green};
  width: 56px;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
`;

export const Remove = styled(BaseButton)`
  background-color: ${colors.red};
  width: 56px;
`;

export const Menu = styled(BaseButton)`
  background-color: ${colors.white};
  width: 56px;
`;

export const SubMenuDown = styled.nav`
  width: 150px;
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
  z-index: 9999;
  border: 1px solid ${colors.greyDark};
  box-shadow: ${shadows.std};
  border-bottom: none;
`;

export const SubButton = styled.button`
  text-align: left;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: ${colors.greyPreMedium};
  color: ${colors.greyFont};
  padding: 15px 12px;
  cursor: pointer;
  border-bottom: 1px solid ${colors.greyMedium};

  &:hover {
    opacity: 0.6;
    background-color: ${colors.grey};
    color: ${colors.blue};
  }
`;
