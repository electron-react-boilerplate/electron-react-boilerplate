import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MasonryView from '../components/MasonryView';
import {
  makeSelectItemsList,
  makeSelectLoading,
  makeSelectError,
  makeSelectHasNextPage,
  makeSelectScrollPosition,
  makeSelectItems,
  makeSelectOldWidth,
} from '../selectors/gallery';
import { loadItems, saveScrollPosition } from '../actions/gallery';

export function mapDispatchToProps(dispatch) {
  return {
    onLoadItems: (moduleId, galleryId, searchQuery) => dispatch(loadItems(moduleId, galleryId, searchQuery)),
    onSaveScrollPosition: (moduleId, galleryId, searchQuery, scrollPosition, oldWidth) =>
      dispatch(saveScrollPosition(moduleId, galleryId, searchQuery, scrollPosition, oldWidth)),
  };
}

const mapStateToProps = (_, ownProps) => {
  const { moduleId, galleryId, searchQuery } = ownProps;

  return createStructuredSelector({
    itemsList: makeSelectItemsList(moduleId, galleryId, searchQuery),
    items: makeSelectItems(moduleId, galleryId, searchQuery),
    hasNextPage: makeSelectHasNextPage(moduleId, galleryId, searchQuery),
    scrollPosition: makeSelectScrollPosition(moduleId, galleryId, searchQuery),
    oldWidth: makeSelectOldWidth(moduleId, galleryId, searchQuery),
    loading: makeSelectLoading(moduleId, galleryId, searchQuery),
    error: makeSelectError(moduleId, galleryId, searchQuery),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MasonryView);
