import styled from 'styled-components';
import { IconProps } from './interface';

export const IconWrapper = styled.p<IconProps>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
`;
