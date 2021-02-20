import React from 'react';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import OrdersList from 'pages/Orders/List';

const history = createBrowserHistory();

const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL;
export const BASE_URL = `${BASE_BACKEND_URL}/api`;
const ORDERS_LIST_URL = '/orders';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/'}>
          Landing
        </Route>
        <Route path={ORDERS_LIST_URL} component={OrdersList} />
        <Route path="*">
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
