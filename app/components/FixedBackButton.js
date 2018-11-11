import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from 'styled-components';

const FixedContent = styled.div`
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 1300;
`;

export class FixedBackButton extends PureComponent {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    const { history } = this.props;

    if (history && history.goBack) {
      history.goBack();
    }
  }

  render() {
    const { color } = this.props;

    return (
      <FixedContent>
        <Button variant="fab" color={color} onClick={this.goBack} aria-label="Back">
          <ArrowBackIcon />
        </Button>
      </FixedContent>
    );
  }
}

FixedBackButton.defaultProps = {
  color: 'default',
};

FixedBackButton.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  color: PropTypes.string,
};

export default FixedBackButton;
