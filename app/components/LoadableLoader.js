import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from './LoadingIndicator';

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: start;
`;

export const LoadableLoader = () => (
  <Wrapper>
    <LoadingIndicator />
  </Wrapper>
);

export default LoadableLoader;
