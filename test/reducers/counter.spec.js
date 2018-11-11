import { fromJS } from 'immutable';

import counter from '../../app/reducers/counter';
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER
} from '../../app/actions/counter';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counter(undefined, {})).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      const initialState = fromJS({
        count: 1
      });

      expect(
        counter(initialState, { type: INCREMENT_COUNTER })
      ).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      const initialState = fromJS({
        count: 1
      });

      expect(
        counter(initialState, { type: DECREMENT_COUNTER })
      ).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      const initialState = fromJS({
        count: 1
      });

      expect(counter(initialState, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
