import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import Routes from '../Routes';
var Root = function(_a) {
  var store = _a.store,
    history = _a.history;
  return React.createElement(
    Provider,
    { store: store },
    React.createElement(
      ConnectedRouter,
      { history: history },
      React.createElement(Routes, null)
    )
  );
};
export default hot(Root);
//# sourceMappingURL=Root.js.map
