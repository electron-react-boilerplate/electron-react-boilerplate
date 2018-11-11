import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';

export class ToggleIconButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { icon, disabled, color, title } = this.props;

    return (
      <IconButton aria-label={title} title={title} onClick={this.handleClick} disabled={disabled} color={color}>
        {icon}
      </IconButton>
    );
  }
}

ToggleIconButton.defaultProps = {
  color: 'default',
  onClick: null,
};

ToggleIconButton.propTypes = {
  icon: PropTypes.element,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string,
};

ToggleIconButton.defaultProps = {
  icon: null,
  disabled: false,
  title: 'Toggle',
};

export default ToggleIconButton;
