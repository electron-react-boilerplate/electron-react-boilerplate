import React from 'react';
import { BounceLoader } from 'halogenium';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: relative;
`;

const LoadingIndicator = () => (
  <Wrapper>
    <BounceLoader color="#2196f3" size="100px" margin="2rem" />
  </Wrapper>
);

export default LoadingIndicator;
