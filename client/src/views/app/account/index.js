/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Account from './Account/index';
import AddUser from './AddUser/index';
import EmailSetting from './EmailSetting/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/`} component={Account} />
      <Route exact path={`${match.url}/user/add`} component={AddUser} />
      <Route
        exact
        path={`${match.url}/email-setting`}
        component={EmailSetting}
      />
    </Switch>
  );
};

export default App;
