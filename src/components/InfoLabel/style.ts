import styled from 'styled-components';

export const Container = styled.div<{ fontSize: string; color: string }>`
  font-size: ${(props) => props.fontSize};
  padding: 3px 6px;
  border: 1px solid ${(props) => props.color};
  color: ${(props) => props.color};
  font-weight: strong;
  margin-right: 16px;
  max-height: 22px;
  display: flex;
  align-items: center;
`;
