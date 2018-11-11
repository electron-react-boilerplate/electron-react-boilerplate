import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const Title = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const Image = styled.img`
  max-width: 100vw;
  max-height: calc(100vh - 96px);
  width: auto;
  height: auto;
`;

export class ImageDialog extends Component {
  constructor() {
    super();

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { handleClose } = this.props;

    if (handleClose) {
      handleClose();
    }
  }

  render() {
    const { open, image, fullScreen } = this.props;

    return (
      <Dialog fullScreen={fullScreen} open={open} onClose={this.handleClose} maxWidth={false}>
        <Title disableTypography>
          <Button variant="fab" aria-label="Edit" onClick={this.handleClose}>
            <CloseIcon />
          </Button>
        </Title>
        <ImageWrapper>{image ? <Image src={image} alt="Dialogue Image" /> : null}</ImageWrapper>
      </Dialog>
    );
  }
}

ImageDialog.defaultProps = {
  image: null,
};

ImageDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  image: PropTypes.string,
};

export default withMobileDialog()(ImageDialog);
