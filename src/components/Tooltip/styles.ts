import styled from 'styled-components';
import { colors, measures } from 'styles/global.styles';

export const Container = styled.div`
  position: absolute;
  top: -47px;
  left: 50%;
  max-width: 350px;
  padding: 10px;
  transform: translateX(-50%);
  background-color: ${colors.blueLighter};
  color: ${colors.blue};
  border: 1px solid ${colors.blue};
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
  border-radius: ${measures.borderRadius};
  z-index: 1000;
  white-space: nowrap;
  overflow: visible;
  text-overflow: ellipsis;
  opacity: 0;
  transition: opacity 0.1s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 100%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: ${colors.blueLighter};
    border-bottom: 1px solid ${colors.blue};
    border-right: 1px solid ${colors.blue};
    z-index: 9999;
  }

  &.loaded {
    opacity: 1;
    transition: opacity 0.3s;
  }
`;
