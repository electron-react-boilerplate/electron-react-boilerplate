import * as actions from '../../app/actions/gallery';

describe('actions', () => {
  describe('gallery', () => {
    it('markItem should create MARK_ITEM action', () => {
      expect(actions.markItem(1, 2, 'search', 3, true)).toMatchSnapshot();
    });

    it('saveScrollPosition should create SAVE_SCROLL_POSITION action', () => {
      expect(actions.saveScrollPosition(1, 2, 'search', 3, 4)).toMatchSnapshot();
    });

    it('loadItems should create LOAD_ITEMS action', () => {
      expect(actions.loadItems(1, 2, 'search')).toMatchSnapshot();
    });

    it('itemsLoaded should create LOAD_ITEMS_SUCCESS action', () => {
      expect(actions.itemsLoaded(1, 2, 'search', true)).toMatchSnapshot();
    });

    it('itemsLoadingError should create LOAD_ITEMS_ERROR action', () => {
      expect(actions.itemsLoadingError(1, 2, 'search', 'error')).toMatchSnapshot();
    });

    it('itemLoaded should create LOAD_ITEM_SUCCESS action', () => {
      expect(actions.itemLoaded(1, 2, 'search', 'item')).toMatchSnapshot();
    });

    it('itemLoadingError should create LOAD_ITEM_ERROR action', () => {
      expect(actions.itemLoadingError(1, 2, 'search', 'item', 'error')).toMatchSnapshot();
    });
  });
});
