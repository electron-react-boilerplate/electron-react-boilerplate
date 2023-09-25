import styled from 'styled-components';

export const SnippetsPage = styled.div`
  flex-grow: 1;
  padding: 20px 10px;
`;

export const Actions = styled.div`
  align-items: center;
  column-gap: 1rem;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

export const TextAreaHeader = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;

  p {
    color: ${({ theme }) => theme.white};
    font-size: 16px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
  }

  b {
    display: block;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
