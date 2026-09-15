import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../renderer/App';

describe('App', () => {
  it('renders the home route and project links', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: 'electron-react-boilerplate' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read our docs/ })).toHaveAttribute(
      'href',
      'https://electron-react-boilerplate.js.org/',
    );
    expect(screen.getByRole('link', { name: /Donate/ })).toHaveAttribute(
      'href',
      'https://github.com/sponsors/electron-react-boilerplate',
    );
  });
});
