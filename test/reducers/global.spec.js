import Imutable from 'immutable';
import globalReducer from '../../app/reducers/gallery';
import { SET_GALLERY, SWITCH_VIEW } from '../../app/actions/global';

describe('reducers', () => {
  describe('gallery', () => {
    it('should handle initial state', () => {
      expect(globalReducer(undefined, {})).toMatchSnapshot();
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

      expect(globalReducer(state, action)).toMatchSnapshot();
    });

    it('should handle SWITCH_VIEW', () => {
      const state = Imutable.Map({});

      const action = {
        type: SWITCH_VIEW,
      };

      expect(globalReducer(state, action)).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      const state = Imutable.Map({});

      expect(globalReducer(state, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
