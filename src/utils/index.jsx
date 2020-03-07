import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import isAuthenticated from '@services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect t0={{ pathname: '/', state: { from: props.location } }} />
      )}
  />
);

export default PrivateRoute;
