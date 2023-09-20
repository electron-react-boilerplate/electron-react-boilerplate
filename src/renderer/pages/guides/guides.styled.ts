import styled from 'styled-components';

export const GuidesPage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;

  h3 {
    font-size: 20px;
    font-weight: 300;

    span {
      color: ${({ theme }) => theme.secondary};
      font-size: 14px;
    }
  }
  ol {
    margin-top: 1rem;
  }
`;
