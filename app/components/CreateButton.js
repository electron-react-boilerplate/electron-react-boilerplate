import React from 'react';
import { Button } from 'semantic-ui-react';
import { Route, Link, withRouter } from 'react-router-dom';

const CreateButton = ({ to, location }) => (
  <Route
    path={to}
    children={({ match }) => (
      <Link replace={to === location.pathname} to={to}>
        <Button>Create DB</Button>
      </Link>
    )}
  />
);

export default withRouter(CreateButton);
