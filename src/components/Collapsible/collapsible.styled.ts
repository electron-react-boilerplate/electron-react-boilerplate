import styled from 'styled-components';

export const Headline = styled.h2`
  align-items: center;
  border-radius: 4px;
  display: flex;
  font-size: 24px;
  transition: all 0.1s linear;

  &:hover {
    background-color: ${({ theme }) => theme.primary_60};
  }

  svg {
    width: 24px;
    min-width: 24px;
  }
`;

export const CollapsibleContainer = styled.div`
  display: inline-block;
  width: 100%;
`;

export const CollapsibleContent = styled.div`
  padding: 0 25px;
`;
