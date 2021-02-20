import React from 'react';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PageLayout from 'components/PageLayout';
import Login from 'pages/Login';
import OrdersList from 'pages/Orders/List';
import OrderDetail from 'pages/Orders/Detail';

const history = createBrowserHistory();

const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL;
export const BASE_URL = `${BASE_BACKEND_URL}/api`;
export const LOGIN_URL = '/login';
export const ORDERS_LIST_URL = '/orders';
export const ORDER_DETAIL_URL = '/order/:id';

const Routes = () => {
  return (
    <PageLayout>
      <Router history={history}>
        <Switch>
          <Route exact path={'/'}>
            Landing
          </Route>
          <Route exact path={LOGIN_URL} component={Login} />
          <Route exact path={ORDERS_LIST_URL} component={OrdersList} />
          <Route exact path={ORDER_DETAIL_URL} component={OrderDetail} />
          <Route path="*">
            <Redirect to={'/'} />
          </Route>
        </Switch>
      </Router>
    </PageLayout>
  );
};

export default Routes;
