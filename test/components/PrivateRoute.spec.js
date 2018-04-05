import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Redirect, Component } from 'react-router-dom';
import { PrivateRoute } from '../../app/components/PrivateRoute';

/*
 * See https://youtu.be/OSA1t3y3Mns for how to setup debugging tests in Visual Studio Code
 */
Enzyme.configure({ adapter: new Adapter() });

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

/*
 * adapted from https://stackoverflow.com/a/44426403
 */
describe('PrivateRoute component', () => {
  it('renders Redirect when user NOT autheticated', () => {
    localStorage.clear();
    const enzymeWrapper = shallow(<PrivateRoute />);
    expect(enzymeWrapper.find(Redirect)).toHaveLength(1);
  });

  it('renders Component when user autheticated', () => {
    localStorage.setItem('user', 'exists');
    const enzymeWrapper = shallow(<PrivateRoute />);
    expect(enzymeWrapper.find(Component)).toHaveLength(1);
  });
});
