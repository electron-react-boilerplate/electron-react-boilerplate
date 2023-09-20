import styled, { css } from 'styled-components';
import { InputGroup, List } from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';

const ListElement = css`
  display: flex;
  padding: 8px 8px 8px 10px;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

export const InputEdit = styled(InputGroup)`
  &,
  input {
    outline: none !important;
    border: none;
    border-radius: 0;

    &:focus,
    &:hover {
      border: none;
      outline: none;
    }
  }
`;

export const Edit = styled(EditIcon)`
  border-radius: 50%;
  color: ${({ theme }) => theme.black};
  padding: 4px;
  min-width: 23px;
  transition: background-color ${({ theme }) => theme.animation_time} ease;

  &:hover {
    color: ${({ theme }) => theme.black};
    background-color: ${({ theme }) => theme.primary_30};
  }
`;

export const ResultElement = styled(List.Item)<{ selected: boolean }>`
  ${ListElement}
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.animation_time} ease;

  ${({ theme, selected }) =>
    selected
      ? css`
          background-color: ${theme.primary};
          color: ${({ theme }) => theme.white};

          ${Edit} {
            color: ${({ theme }) => theme.white};
          }
        `
      : css`
          &:hover {
            color: ${({ theme }) => theme.black};
            background-color: ${({ theme }) => theme.primary_5};
          }
        `}
`;

export const NoMatches = styled.span`
  ${ListElement}
  color: ${({ theme }) => theme.white};
`;

export const ResultsList = styled(List)<{ $error: boolean }>`
  color: ${({ theme }) => theme.gray_darker};
  display: flex;
  flex-direction: column;
  margin-top: 0;
  padding: 0;

  .rs-input-group.rs-input-group-inside {
    .edition-input {
      min-height: 39px;
      border-radius: 4px;
    }

    .rs-btn {
      height: 100%;
      border-radius: 4px;
    }
  }

  ${({ theme, $error }) =>
    $error
      ? css`
          .rs-input-group.rs-input-group-inside {
            .edition-input {
              border-radius: 4px;
              box-shadow: inset 0px 0px 2px 1px ${theme.red};

              &::placeholder {
                color: ${theme.red} !important;
              }
            }
            .rs-picker-toggle-placeholder {
              color: ${theme.red} !important;
            }
            .rs-btn {
              svg {
                fill: ${theme.red} !important;
              }
            }
          }
        `
      : css`
          .rs-input-group.rs-input-group-inside {
            .edition-input {
              &:focus {
                box-shadow: inset 0px 0px 2px 1px ${theme.primary};
              }
            }
            .rs-btn {
              &:hover {
                background: ${({ theme }) => theme.primary_5} !important;
              }

              svg {
                fill: ${theme.primary} !important;
              }
            }
          }
        `}
`;
