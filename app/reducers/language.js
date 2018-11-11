import { fromJS } from 'immutable';

import { CHANGE_LOCALE } from '../actions/language';
import { DEFAULT_LOCALE } from '../i18n';

export const initialState = fromJS({
  locale: DEFAULT_LOCALE
});

export default function language(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}
