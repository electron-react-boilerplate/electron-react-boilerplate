import * as actions from '../../app/actions/global';

describe('actions', () => {
  describe('global', () => {
    it('switchView should create SWITCH_VIEW action', () => {
      expect(actions.switchView(1, 2, 'search')).toMatchSnapshot();
    });

    it('setGallery should create SET_GALLERY action', () => {
      expect(actions.setGallery()).toMatchSnapshot();
    });
  });
});
