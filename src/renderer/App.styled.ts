import styled from 'styled-components';

export const AppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  overflow-y: hidden;
  position: relative;
`;

export const Content = styled.div`
  column-gap: 1rem;
  display: flex;
  flex-grow: 1;
  height: 100%;
  overflow: auto;
  padding: 0 10px;
  width: 100%;
`;
