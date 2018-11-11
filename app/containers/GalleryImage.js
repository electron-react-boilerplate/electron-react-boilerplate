import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import GalleryImage from '../components/GalleryImage';
import { makeSelectItem } from '../selectors/gallery';

export const mapStateToProps = (_, ownProps) => {
  const { moduleId, galleryId, searchQuery, id } = ownProps;
  return createStructuredSelector({
    item: makeSelectItem(moduleId, galleryId, searchQuery, id),
  });
};

export default connect(
  mapStateToProps,
  null,
)(GalleryImage);
