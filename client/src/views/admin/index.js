/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import Layout from './Layout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);

const Pakages = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './pakages')
);

const Coupons = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './coupons')
);

const Home = ({ match, history }) => {
  return (
    <Layout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect
            exact
            from={`${match.url}/`}
            to={`${match.url}/dashboard`}
          />
          <Route
            path={`${match.url}/dashboard`}
            render={(props) => <Dashboard {...props} />}
          />
          <Route
            path={`${match.url}/pakages`}
            render={(props) => <Pakages {...props} />}
          />
          <Route
            path={`${match.url}/coupons`}
            render={(props) => <Coupons {...props} />}
          />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default Home;
