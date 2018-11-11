import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export class BackButton extends PureComponent {
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
      <IconButton color={color} onClick={this.goBack} aria-label="Back">
        <ArrowBackIcon />
      </IconButton>
    );
  }
}

BackButton.defaultProps = {
  color: 'default',
};

BackButton.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  color: PropTypes.string,
};

export default BackButton;
