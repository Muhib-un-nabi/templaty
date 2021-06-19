/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  user,
  token,
  ...rest
}) => {
  const setComponent = (props) => {
    if (sessionStorage.getItem('token')) {
      if (roles) {
        if (roles.includes(user.role)) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: props.location }
            }}
          />
        );
      }
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/user/login',
          state: { from: props.location }
        }}
      />
    );
  };
  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
const mapStateToProps = ({ user: { user, token } }) => ({ user, token });

export default connect(mapStateToProps)(ProtectedRoute);
