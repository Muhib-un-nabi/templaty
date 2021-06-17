/* eslint-disable prettier/prettier */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Contacts from './Contacts/index';
import AddContact from './AddContact/index';
import ContactSetting from './ContactSetting/index';
import EditContact from './EditContact/index';

const App = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
      <Route exact path={`${match.url}/all`} component={Contacts} />
      <Route exact path={`${match.url}/add`} component={AddContact} />
      <Route exact path={`${match.url}/edit/:id`} component={EditContact} />
      <Route exact path={`${match.url}/setting`} component={ContactSetting} />
    </Switch>
  );
};

export default App;
