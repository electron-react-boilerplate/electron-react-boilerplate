import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';

Object.defineProperty(window, 'api', {
  writable: false,
  value: {
    incrementNumber: jest.fn(),
    decrementNumber: jest.fn(),
    onResponse: jest.fn(),
    removeResponseChannel: jest.fn(),
  },
});

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
