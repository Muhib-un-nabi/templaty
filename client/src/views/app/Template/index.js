/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Template from './Template/index';
import AddTemplate from './AddTemplate/index';
import EditTemplate from './EditTemplate/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route exact path={`${match.url}/all`} component={Template} />
      <Route exact path={`${match.url}/add`} component={AddTemplate} />
      <Route exact path={`${match.url}/edit/:id`} component={EditTemplate} />
    </Switch>
  );
};

export default App;
