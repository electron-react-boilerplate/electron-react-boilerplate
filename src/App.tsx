import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Register listener when component is mounted.
    window.api.onResponse('update-counter', (val: number) => {
      setCounter(val);
    });
    return () => {
      // Cleanup listener when component is unmounted.
      window.api.removeResponseChannel('update-counter');
    };
  }, []);

  const doIncrement = () => {
    window.api.incrementNumber(counter);
  };

  const doDecrement = () => {
    window.api.decrementNumber(counter);
  };

  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1 className="Hello">electron-react-boilerplate</h1>
      <div className="Hello">
        <button type="button" onClick={doDecrement}>
          -
        </button>
        <span className="Count">{counter}</span>
        <button type="button" onClick={doIncrement}>
          +
        </button>
      </div>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
