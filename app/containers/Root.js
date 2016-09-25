import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';


const Root = ({ store, history, routes }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);


Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired
};


export default Root;
