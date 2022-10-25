import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Home } from '../renderer/pages/home/Home';

describe('App', () => {
  it('should render', () => {
    expect(render(<Home />)).toBeTruthy();
  });
});
