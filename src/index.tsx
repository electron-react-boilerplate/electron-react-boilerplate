import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './App.global.css';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);
