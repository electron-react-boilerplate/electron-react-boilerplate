/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { spy } from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Counter from '../../app/components/Counter';


function setup() {
  const actions = {
    increment: spy(),
    incrementIfOdd: spy(),
    incrementAsync: spy(),
    decrement: spy()
  };
  const component = shallow(<Counter counter={1} {...actions} />);
  return {
    component,
    actions,
    buttons: component.find('button'),
    p: component.find('.counter')
  };
}


describe('Counter component', () => {
  it('should should display count', () => {
    const { p } = setup();
    expect(p.text()).to.match(/^1$/);
  });

  it('should first button should call increment', () => {
    const { buttons, actions } = setup();
    buttons.at(0).simulate('click');
    expect(actions.increment.called).to.be.true;
  });

  it('should second button should call decrement', () => {
    const { buttons, actions } = setup();
    buttons.at(1).simulate('click');
    expect(actions.decrement.called).to.be.true;
  });

  it('should third button should call incrementIfOdd', () => {
    const { buttons, actions } = setup();
    buttons.at(2).simulate('click');
    expect(actions.incrementIfOdd.called).to.be.true;
  });

  it('should fourth button should call incrementAsync', () => {
    const { buttons, actions } = setup();
    buttons.at(3).simulate('click');
    expect(actions.incrementAsync.called).to.be.true;
  });
});
