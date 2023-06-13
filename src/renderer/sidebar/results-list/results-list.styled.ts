import styled, { css } from 'styled-components';
import { List } from 'rsuite';

const ListElement = css`
  display: flex;
  padding: 8px 10px;
  width: 100%;
`;

export const ResultsList = styled(List)`
  color: ${({ theme }) => theme.gray_darker};
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0;
`;

export const ResultElement = styled(List.Item)<{ selected: boolean }>`
  ${ListElement}
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.animation_time} ease;

  ${({ theme, selected }) =>
    selected
      ? css`
          background-color: ${theme.secondary};
          color: ${({ theme }) => theme.white};
        `
      : css`
          &:hover {
            color: ${({ theme }) => theme.black};
            background-color: ${({ theme }) => theme.secondary_5};
          }
        `}
`;

export const NoMatches = styled.span`
  ${ListElement}
  color: ${({ theme }) => theme.white};
`;
