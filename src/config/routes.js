import React from 'react';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PageLayout from 'components/PageLayout';
import Login from 'pages/Login';
import OrdersList from 'pages/Orders/List';
import OrderDetail from 'pages/Orders/Detail';
import { LOGIN_URL, ORDERS_LIST_URL, ORDER_DETAIL_URL } from 'config/urls';

const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <PageLayout>
          <Route exact path={'/'}>
            Landing
          </Route>
          <Route exact path={ORDERS_LIST_URL} component={OrdersList} />
          <Route exact path={ORDER_DETAIL_URL} component={OrderDetail} />
        </PageLayout>
        <Route exact path={LOGIN_URL} component={Login} />
        <Route path="*">
          <Redirect to={'/'} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
