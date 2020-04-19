/* eslint react/jsx-props-no-spreading: off */
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Counter from '../../../app/features/counter/Counter';
import * as counterSlice from '../../../app/features/counter/counterSlice';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

function setup(
  preloadedState: { counter: { value: number } } = { counter: { value: 1 } }
) {
  const store = configureStore({
    reducer: { counter: counterSlice.default },
    preloadedState
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router>
          <Counter />
        </Router>
      </Provider>
    );
  const component = getWrapper();
  return {
    store,
    component,
    buttons: component.find('button'),
    p: component.find('.counter')
  };
}

describe('Counter component', () => {
  it('should should display count', () => {
    const { p } = setup();
    expect(p.text()).toMatch(/^1$/);
  });

  it('should first button should call increment', () => {
    const { buttons } = setup();
    const incrementSpy = spy(counterSlice, 'increment');

    buttons.at(0).simulate('click');
    expect(incrementSpy.called).toBe(true);
    incrementSpy.restore();
  });

  it('should match exact snapshot', () => {
    const { store } = setup();
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Counter />
          </Router>
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should second button should call decrement', () => {
    const { buttons } = setup();
    const decrementSyp = spy(counterSlice, 'decrement');
    buttons.at(1).simulate('click');
    expect(decrementSyp.called).toBe(true);
    decrementSyp.restore();
  });

  it('should third button should call incrementIfOdd', () => {
    const { buttons } = setup();
    const incrementIfOdd = spy(counterSlice, 'incrementIfOdd');
    buttons.at(2).simulate('click');
    expect(incrementIfOdd.called).toBe(true);
    incrementIfOdd.restore();
  });

  it('should fourth button should call incrementAsync', () => {
    const { buttons } = setup();
    const incrementAsync = spy(counterSlice, 'incrementAsync');
    buttons.at(3).simulate('click');
    expect(incrementAsync.called).toBe(true);
    incrementAsync.restore();
  });

  it('should display updated count after increment button click', () => {
    const { buttons, p } = setup();
    buttons.at(0).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });

  it('should display updated count after decrement button click', () => {
    const { buttons, p } = setup();
    buttons.at(1).simulate('click');
    expect(p.text()).toMatch(/^0$/);
  });

  it('shouldnt change if even and if odd button clicked', () => {
    const { buttons, p } = setup({ counter: { value: 2 } });
    buttons.at(2).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });

  it('should change if odd and if odd button clicked', () => {
    const { buttons, p } = setup({ counter: { value: 1 } });
    buttons.at(2).simulate('click');
    expect(p.text()).toMatch(/^2$/);
  });
});

describe('Test counter actions', () => {
  it('should not call incrementAsync before timer', () => {
    const fn = counterSlice.incrementAsync(1000) as Function;
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    jest.advanceTimersByTime(500);
    expect(dispatch.called).toBe(false);
  });

  it('should call incrementAsync after timer', () => {
    const fn = counterSlice.incrementAsync(1000) as Function;
    expect(fn).toBeInstanceOf(Function);
    const dispatch = spy();
    fn(dispatch);
    jest.advanceTimersByTime(1001);
    expect(dispatch.called).toBe(true);
  });
});
