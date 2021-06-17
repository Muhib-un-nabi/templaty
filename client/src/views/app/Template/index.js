/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Template from './Template';

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={Template} />
    </Switch>
  );
};

export default App;
