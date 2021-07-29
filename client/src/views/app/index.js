/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import AppLayout from '../../layout/AppLayout';
import habdelGetData from '../../helpers/habdelGetData';
import {
  getMe,
  setLoading,
  getTeamDetails,
  updateTeamDetails
} from '../../redux/user/action';
import { connect } from 'react-redux';

import socketIo from 'socket.io-client';
const io = socketIo();

const Template = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './Template')
);

const Snippets = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './snippets')
);

const Contact = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './contacts')
);

//  place Holder
const Placeholder = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './placeholder')
);

const Types = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './types')
);

const Account = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './account')
);

const App = ({
  match,
  history,
  //Redux Data
  user,
  getMe,
  //Actions
  setLoading,
  getTeamDetails,
  updateTeamDetails
}) => {
  useEffect(() => {
    if (!user) return;
    io.emit('join team', user.team);
    window.io = io;
    io.emit('pakckage updated Request');

    io.on('pakckage updated', async (data) => {
      await updateTeamDetails(data);
    });
  }, [user]);
  useEffect(() => {
    if (user) return;
    habdelGetData(getMe, setLoading, history);
    habdelGetData(getTeamDetails, setLoading, history);
  }, []);

  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/templates`}
            />
            <Route
              path={`${match.url}/snippets`}
              render={(props) => <Snippets {...props} />}
            />
            {/* Place Holder Routes */}
            <Route
              path={`${match.url}/placeholders`}
              render={(props) => <Placeholder {...props} />}
            />
            {/* Contacts Route */}
            <Route
              path={`${match.url}/contacts`}
              render={(props) => <Contact {...props} />}
            />

            <Route
              path={`${match.url}/templates`}
              render={(props) => <Template {...props} />}
            />

            <Route
              path={`${match.url}/types`}
              render={(props) => <Types {...props} />}
            />
            <Route
              path={`${match.url}/account`}
              render={(props) => <Account {...props} />}
            />

            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ user: { user } }) => ({ user });
export default connect(mapStateToProps, {
  getMe,
  setLoading,
  getTeamDetails,
  updateTeamDetails
})(withRouter(App));
