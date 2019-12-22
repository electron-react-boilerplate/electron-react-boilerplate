import {
  counterReducer,
  increment,
  decrement
} from '../../app/features/counter/counterSlice';

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counterReducer(undefined, {})).toMatchSnapshot();
    });

    it('should handle increment', () => {
      expect(counterReducer(1, { type: increment })).toMatchSnapshot();
    });

    it('should handle decrement', () => {
      expect(counterReducer(1, { type: decrement })).toMatchSnapshot();
    });

    it('should handle unknown action type', () => {
      expect(counterReducer(1, { type: 'unknown' })).toMatchSnapshot();
    });
  });
});
