import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import HomePage from '../../app/containers/Home';

Enzyme.configure({ adapter: new Adapter() });

describe('containers', () => {
  describe('Home', () => {
    it('should render home page', () => {
      const tree = renderer.create(<HomePage />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
