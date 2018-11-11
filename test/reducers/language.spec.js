import Imutable from 'immutable';
import languageReducer from '../../app/reducers/language';
import { CHANGE_LOCALE } from '../../app/actions/language';

describe('reducers', () => {
  describe('gallery', () => {
    it('should handle initial state', () => {
      expect(languageReducer(undefined, {})).toMatchSnapshot();
    });

    it('should handle CHANGE_LOCALE', () => {
      const state = Imutable.Map({});

      const action = {
        type: CHANGE_LOCALE,
        locale: 'en',
      };

      expect(languageReducer(state, action)).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      const state = Imutable.Map({});

      expect(languageReducer(state, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
