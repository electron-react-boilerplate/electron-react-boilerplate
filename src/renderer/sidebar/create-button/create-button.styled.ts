import { Input, Modal, TagInput } from 'rsuite';
import styled from 'styled-components';

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
export const SnippetKeywordInput = styled(TagInput)`
  color: ${({ theme }) => theme.gray_darker};
  .rs-picker-search-input {
    input {
      width: 100% !important;
      max-width: 150px !important;
    }
  }
`;
export const SnippetModal = styled(Modal)`
  .rs-modal-content {
    background: linear-gradient(
      200.96deg,
      ${({ theme }) => theme.gray_darker} -29.09%,
      ${({ theme }) => theme.gray_darker} 51.77%,
      ${({ theme }) => theme.black} 129.35%
    );
    display: flex;
    flex-direction: column;
  }

  .rs-modal-title {
    color: ${({ theme }) => theme.white};
  }
`;

export const SnippetModalForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
