/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Snippet from './Snippet/index';
import AddSnippet from './AddSnippets/index';
import EditSnippet from './EditSnippets/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route exact path={`${match.url}/all`} component={Snippet} />
      <Route exact path={`${match.url}/add`} component={AddSnippet} />
      <Route exact path={`${match.url}/edit/:id`} component={EditSnippet} />
    </Switch>
  );
};

export default App;
