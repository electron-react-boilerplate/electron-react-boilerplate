import React from 'react';
import styled from 'styled-components';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';

import messages from '../messages/Gallery';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoResults = () => (
  <Wrapper>
    <Row>
      <Typography align="center" color="textSecondary" noWrap>
        <SentimentDissatisfiedIcon style={{ width: '100px', height: '100px' }} />
      </Typography>
    </Row>
    <Row>
      <Typography align="center" color="textSecondary" noWrap variant="h5">
        <FormattedMessage {...messages.noResults} />
      </Typography>
    </Row>
  </Wrapper>
);

export default NoResults;
