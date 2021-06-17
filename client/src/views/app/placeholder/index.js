/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Placeholders from './Placeholder/index';
import AddPlaceholder from './AddPlaceholder/index';
import EditPlaceholder from './EditPlaceholder/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route exact path={`${match.url}/all`} component={Placeholders} />
      <Route exact path={`${match.url}/add`} component={AddPlaceholder} />
      <Route exact path={`${match.url}/edit/:id`} component={EditPlaceholder} />
    </Switch>
  );
};

export default App;
