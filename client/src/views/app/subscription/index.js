/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Coupons from './Coupons/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route exact path={`${match.url}/all`} component={Coupons} />
    </Switch>
  );
};

export default App;
