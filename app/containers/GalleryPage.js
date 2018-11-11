import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Gallery from '../components/Gallery';
import injectSaga from '../utils/injectSaga';
import saga from '../sagas/gallery';
import { saveScrollPosition } from '../actions/gallery';
import { switchView, setGallery } from '../actions/global';
import { makeSelectShowMasonry } from '../selectors/global';

export function mapDispatchToProps(dispatch) {
  return {
    onSaveScrollPosition: (moduleId, galleryId, searchQuery, scrollPosition) =>
      dispatch(saveScrollPosition(moduleId, galleryId, searchQuery, scrollPosition)),
    onSwitchView: () => dispatch(switchView()),
    onSetGallery: (moduleId, galleryId, searchQuery) => dispatch(setGallery(moduleId, galleryId, searchQuery)),
  };
}

export const mapStateToProps = () =>
  createStructuredSelector({
    showMasonry: makeSelectShowMasonry(),
  });

export const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const withSaga = injectSaga({ key: 'gallery', saga });

export default compose(
  withSaga,
  withConnect,
)(Gallery);
