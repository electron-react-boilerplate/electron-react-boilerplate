import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ListView from '../components/ListView';
import {
  makeSelectItems,
  makeSelectItemsList,
  makeSelectLoading,
  makeSelectError,
  makeSelectHasNextPage,
  makeSelectScrollPosition,
} from '../selectors/gallery';
import { loadItems, saveScrollPosition } from '../actions/gallery';

export function mapDispatchToProps(dispatch) {
  return {
    onLoadItems: (moduleId, galleryId, searchQuery) => dispatch(loadItems(moduleId, galleryId, searchQuery)),
    onSaveScrollPosition: (moduleId, galleryId, searchQuery, scrollToIndex) =>
      dispatch(saveScrollPosition(moduleId, galleryId, searchQuery, scrollToIndex)),
  };
}

export const mapStateToProps = (_, ownProps) => {
  const { moduleId, galleryId, searchQuery } = ownProps;

  return createStructuredSelector({
    itemsList: makeSelectItemsList(moduleId, galleryId, searchQuery),
    items: makeSelectItems(moduleId, galleryId, searchQuery),
    hasNextPage: makeSelectHasNextPage(moduleId, galleryId, searchQuery),
    scrollToIndex: makeSelectScrollPosition(moduleId, galleryId, searchQuery),
    loading: makeSelectLoading(moduleId, galleryId, searchQuery),
    error: makeSelectError(moduleId, galleryId, searchQuery),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListView);
