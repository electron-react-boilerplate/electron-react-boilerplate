import React from 'react';
import styled from 'styled-components';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
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

const AnErrorOccured = () => (
  <Wrapper>
    <Row>
      <Typography align="center" color="error" noWrap>
        <SentimentVeryDissatisfiedIcon style={{ width: '100px', height: '100px' }} />
      </Typography>
    </Row>
    <Row>
      <Typography align="center" color="error" noWrap variant="h5">
        <FormattedMessage {...messages.onError} />
      </Typography>
    </Row>
  </Wrapper>
);

export default AnErrorOccured;
