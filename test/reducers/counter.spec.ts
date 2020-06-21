import { AnyAction } from 'redux';
import counterReducer, {
  increment,
  decrement,
} from '../../app/features/counter/counterSlice';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counterReducer(undefined, {} as AnyAction)).toMatchSnapshot();
    });

    it('should handle INCREMENT_COUNTER', () => {
      expect(
        counterReducer({ value: 1 }, { type: increment })
      ).toMatchSnapshot();
    });

    it('should handle DECREMENT_COUNTER', () => {
      expect(
        counterReducer({ value: 1 }, { type: decrement })
      ).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(
        counterReducer({ value: 1 }, { type: 'unknown' })
      ).toMatchSnapshot();
    });
  });
});
