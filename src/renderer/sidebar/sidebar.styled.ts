import styled from 'styled-components';

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 35%;
  padding: 20px 10px;
  row-gap: 2rem;
`;

export const AddSnippet = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 3px;
  color: ${({ theme }) => theme.white};
  padding: 5px 10px;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.secondary_dark};
  }
`;
