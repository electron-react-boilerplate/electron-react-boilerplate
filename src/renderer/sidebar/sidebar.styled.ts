import styled from 'styled-components';

export const SideBar = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

export const AddSnippet = styled.button`
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.secondary};
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;
