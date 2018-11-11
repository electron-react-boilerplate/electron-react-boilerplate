import React from 'react';
import styled from 'styled-components';

import LoadingIndicator from './LoadingIndicator';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const RowLoading = () => (
  <Wrapper>
    <LoadingIndicator />
  </Wrapper>
);

export default RowLoading;
