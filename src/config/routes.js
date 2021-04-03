import React from 'react';

import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PageLayout from 'components/PageLayout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import OrderList from 'pages/Order/List';
import OrderDetail from 'pages/Order/Detail';
import OrderAdd from 'pages/Order/Add';
import PartList from 'pages/Part/List';
import PartDetail from 'pages/Part/Detail';
import PartAdd from 'pages/Part/Add';
import CastingList from 'pages/Casting/List';
import CastingDetail from 'pages/Casting/Detail';
import CastingAdd from 'pages/Casting/Add';
import ExpeditionList from 'pages/Expedition/List';
import ExpeditionDetail from 'pages/Expedition/Detail';
import ExpeditionAdd from 'pages/Expedition/Add';

import {
  LOGIN_URL,
  ORDER_LIST_URL,
  ORDER_DETAIL_URL,
  ORDER_ADD_NEW_URL,
  PART_LIST_URL,
  PART_DETAIL_URL,
  PART_ADD_NEW_URL,
  CASTING_LIST_URL,
  CASTING_DETAIL_URL,
  CASTING_ADD_NEW_URL,
  EXPEDITION_LIST_URL,
  EXPEDITION_DETAIL_URL,
  EXPEDITION_ADD_NEW_URL
} from 'config/urls';

const history = createBrowserHistory();

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <PageLayout>
          <Route exact path={'/'} component={Home} />
          <Route exact path={ORDER_LIST_URL} component={OrderList} />
          <Route exact path={ORDER_DETAIL_URL} component={OrderDetail} />
          <Route exact path={ORDER_ADD_NEW_URL} component={OrderAdd} />
          <Route exact path={CASTING_LIST_URL} component={CastingList} />
          <Route exact path={CASTING_DETAIL_URL} component={CastingDetail} />
          <Route exact path={CASTING_ADD_NEW_URL} component={CastingAdd} />
          <Route exact path={PART_LIST_URL} component={PartList} />
          <Route exact path={PART_DETAIL_URL} component={PartDetail} />
          <Route exact path={PART_ADD_NEW_URL} component={PartAdd} />
          <Route exact path={EXPEDITION_LIST_URL} component={ExpeditionList} />
          <Route
            exact
            path={EXPEDITION_DETAIL_URL}
            component={ExpeditionDetail}
          />
          <Route
            exact
            path={EXPEDITION_ADD_NEW_URL}
            component={ExpeditionAdd}
          />
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
