import * as actions from '../../app/actions/language';

describe('actions', () => {
  describe('language', () => {
    it('changeLocale should create CHANGE_LOCALE action', () => {
      expect(actions.changeLocale('en')).toMatchSnapshot();
    });
  });
});
