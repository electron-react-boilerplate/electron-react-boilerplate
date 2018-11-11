import * as actions from '../../app/actions/counter';

describe('actions', () => {
  it('should increment should create increment action', () => {
    expect(actions.increment()).toMatchSnapshot();
  });

  it('should decrement should create decrement action', () => {
    expect(actions.decrement()).toMatchSnapshot();
  });

  it('should incrementIfOdd should create incrementIfOdd action', () => {
    expect(actions.incrementIfOdd()).toMatchSnapshot();
  });

  it('should incrementAsync should create incrementAsync action', () => {
    expect(actions.incrementAsync()).toMatchSnapshot();
  });
});
