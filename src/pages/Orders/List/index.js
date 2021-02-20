import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { BASE_URL } from 'config/routes';
import {callUrl, get } from 'utils/sdk';

import styles from './styles.module.css';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    callUrl(get, `${BASE_URL}/orders`).then(setOrders);
  }, []);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h3">Orders list</Typography>
      <div>
        <List component="nav">
          {orders.map((order, index) => (
          <ListItem key={index} button selected={false} onClick={() => {}}>
            <ListItemText primary={order.order_number} />
          </ListItem>))}
        </List>
      </div>
    </Paper>
  );
};

export default OrdersList;
