import styled from 'styled-components';

export const ContactPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 10px;

  h2 {
    font-size: 24px;
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  svg {
    margin-top: 1rem;
    width: 24px;
    height: 24px;
  }
`;
