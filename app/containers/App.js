import React, { PropTypes } from 'react';

const App = (props) => (
  <div>
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
