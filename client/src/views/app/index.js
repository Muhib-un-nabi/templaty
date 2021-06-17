import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

import AppLayout from '../../layout/AppLayout';

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

const Account = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './account')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/snippets/add`}
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

export default withRouter(App);
