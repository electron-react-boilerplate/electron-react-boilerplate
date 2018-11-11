import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import styled from 'styled-components';

const FixedContent = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1300;
`;

export class FixedBackToTopButton extends PureComponent {
  static goTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const { color } = this.props;

    return (
      <FixedContent>
        <Button variant="fab" color={color} onClick={this.constructor.goTop} aria-label="Go to Top">
          <ArrowUpwardIcon />
        </Button>
      </FixedContent>
    );
  }
}

FixedBackToTopButton.defaultProps = {
  color: 'default',
};

FixedBackToTopButton.propTypes = {
  color: PropTypes.string,
};

export default FixedBackToTopButton;
