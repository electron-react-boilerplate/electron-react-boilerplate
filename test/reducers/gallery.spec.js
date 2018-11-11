import Imutable from 'immutable';
import galleryReducer from '../../app/reducers/gallery';
import { SET_GALLERY } from '../../app/actions/global';
import {
  SAVE_SCROLL_POSITION,
  MARK_ITEM,
  LOAD_ITEMS,
  LOAD_ITEMS_SUCCESS,
  LOAD_ITEMS_ERROR,
  LOAD_ITEM_SUCCESS,
  LOAD_ITEM_ERROR,
} from '../../app/actions/gallery';

describe('reducers', () => {
  describe('gallery', () => {
    it('should handle initial state', () => {
      expect(galleryReducer(undefined, {})).toMatchSnapshot();
    });

    it('should handle SET_GALLERY', () => {
      const state = Imutable.Map({});

      const action = {
        type: SET_GALLERY,
        payload: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle SAVE_SCROLL_POSITION', () => {
      const state = Imutable.Map({});

      const action = {
        type: SAVE_SCROLL_POSITION,
        payload: {
          scrollPosition: 7,
          oldWidth: 11,
        },
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle MARK_ITEM', () => {
      const state = Imutable.Map({});

      const action = {
        type: MARK_ITEM,
        payload: {
          id: 'id',
          marked: true,
        },
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle LOAD_ITEMS', () => {
      const state = Imutable.Map({});

      const action = {
        type: LOAD_ITEMS,
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle LOAD_ITEMS_SUCCESS', () => {
      const state = Imutable.Map({});

      const action = {
        type: LOAD_ITEMS_SUCCESS,
        payload: {
          hasNextPage: true,
        },
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle LOAD_ITEMS_ERROR', () => {
      const state = Imutable.Map({});

      const action = {
        type: LOAD_ITEMS_ERROR,
        payload: 'error',
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle LOAD_ITEM_SUCCESS', () => {
      const state = Imutable.fromJS({
        '/gallery/moduleId/galleryId': {
          itemsList: ['A', 'B', 'C'],
          items: {},
        },
      });

      const action = {
        type: LOAD_ITEM_SUCCESS,
        payload: {
          id: 'id',
        },
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle LOAD_ITEM_ERROR', () => {
      const state = Imutable.Map({});

      const action = {
        type: LOAD_ITEM_ERROR,
        payload: {
          item: {},
          error: 'error',
        },
        meta: {
          moduleId: 'moduleId',
          galleryId: 'galleryId',
          searchQuery: null,
        },
      };

      expect(galleryReducer(state, action)).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      const state = Imutable.Map({});

      expect(galleryReducer(state, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
