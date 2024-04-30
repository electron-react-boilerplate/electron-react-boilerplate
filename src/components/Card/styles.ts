import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from 'styles/global.styles';

export const Container = styled.div<{ isActive?: boolean }>`
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.greyMedium};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  opacity: ${(props) => (props.isActive ? 0.5 : 1)};
`;

export const ContentLeft = styled.div`
  padding: 10px 3px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const ContentRight = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const Drag = styled.button`
  position: relative;
  background: none;
  border: none;
  background-color: ${colors.white};
  cursor: grab;
  height: 100%;
`;

export const IconDrag = styled.p`
  color: ${colors.greyDark};
  font-size: 24px;
`;

export const Toggle = styled.button`
  position: relative;
  background: none;
  border: none;
  background-color: ${colors.white};
  margin-right: 12px;
  cursor: pointer;
  padding: 0;
  height: 100%;
`;

export const IconToggle = styled.p`
  color: ${colors.green};
  font-size: 24px;
`;

export const Name = styled.div`
  font-size: 18px;
`;

export const Type = styled.div`
  font-size: 14px;
  padding: 3px 6px;
  border: 1px solid ${colors.blue};
  color: ${colors.blue};
  font-weight: strong;
  margin-right: 8px;
`;

export const Edit = styled.button`
  background: none;
  border: none;
  background-color: ${colors.green};
  cursor: pointer;
  height: 100%;
  width: 48px;
  text-decoration: none;
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
`;

export const IconEdit = styled.p`
  color: ${colors.white};
  font-size: 28px;
`;

export const Remove = styled.button`
  background: none;
  border: none;
  background-color: ${colors.red};
  cursor: pointer;
  height: 100%;
  width: 48px;
  text-decoration: none;
`;

export const IconRemove = styled.p`
  color: ${colors.white};
  font-size: 28px;
`;

export const Menu = styled.button`
  position: relative;
  background: none;
  border: none;
  background-color: ${colors.white};
  cursor: pointer;
  height: 100%;
`;

export const IconMenu = styled.p`
  color: ${colors.greyFont};
  font-size: 24px;
`;

export const SubMenuDown = styled.nav`
  width: 150px;
  position: absolute;
  top: 100%;
  right: 0;
  /* transform: translateY(100%); */
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${colors.white};
  z-index: 9999;
  border: 1px solid ${colors.greyDark};
  box-shadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.4);
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
