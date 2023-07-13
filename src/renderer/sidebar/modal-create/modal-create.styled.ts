import { Input, Modal } from 'rsuite';
import styled, { css } from 'styled-components';

export const SnippetTextInput = styled(Input)`
  color: ${({ theme }) => theme.gray_darker};
  border-radius: 5px;
  padding: 10px;
  transition: border-color ${({ theme }) => theme.animation_time} ease;

  &:focus,
  &:hover {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;
// export const SnippetKeywordInput = styled(TagInput)`
export const SnippetKeywordInput = styled(Input)`
  color: ${({ theme }) => theme.gray_darker};

  .rs-picker-tag {
    outline: none;
  }

  .rs-picker-search-input {
    input {
      width: 100% !important;
      max-width: 150px !important;
    }
  }
`;
export const SnippetModal = styled(Modal)<{ $error: boolean }>`
  ${({ theme, $error }) =>
    $error
      ? css`
          ${SnippetKeywordInput}, ${SnippetTextInput} {
            outline: ${theme.red};
            border-color: ${theme.red};

            &::placeholder {
              color: ${theme.red};
            }
          }
          .rs-picker-toggle-placeholder {
            color: ${theme.red};
          }
        `
      : ''}
`;

export const SnippetModalForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

export const FormErrorText = styled.p`
  color: ${({ theme }) => theme.red};
`;
