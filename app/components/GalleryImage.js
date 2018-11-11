import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => (props.gutter ? `${props.gutter}px` : '0')};
`;

export default class GalleryImage extends PureComponent {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { item, onClick } = this.props;
    const { image, hasChildren } = item;
    if (!hasChildren && onClick) {
      onClick(image);
    }
  }

  render() {
    const { style, item, width: clientWidth, moduleId, gutter } = this.props;
    const { id, image, width, height, hasChildren, title } = item;

    const widthAvailable = clientWidth - 2 * gutter;
    const calculatedWidth = Math.min(width, widthAvailable);
    const calculatedHeight = (height / width) * calculatedWidth;

    const card = (
      <Card>
        <CardMedia
          style={{ width: `${calculatedWidth}px`, height: `${calculatedHeight}px` }}
          onClick={this.handleClick}
          src={image}
          alt={title}
          title={title}
          component="img"
        />
      </Card>
    );

    if (hasChildren) {
      return (
        <Cell style={style} gutter={gutter}>
          <Link style={{ cursor: 'pointer' }} to={`/gallery/${moduleId}/${id}`}>
            {card}
          </Link>
        </Cell>
      );
    }

    return (
      <Cell style={style} gutter={gutter}>
        {card}
      </Cell>
    );
  }
}

GalleryImage.defaultProps = {
  gutter: 0,
  onClick: null,
};

GalleryImage.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  gutter: PropTypes.number,
  onClick: PropTypes.func,
  moduleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
