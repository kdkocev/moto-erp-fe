import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

import { BASE_URL, ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { callUrl, get, reverse } from 'utils/sdk';

import styles from './styles.module.css';

const OrdersList = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/order`).then(setOrders);
  }, []);

  const handleListItemOnClick = useCallback(
    (order) => {
      history.push(reverse(ORDER_DETAIL_URL, { id: order.id }));
    },
    [history]
  );

  const handleAddButtonClick = useCallback(() => {
    history.push(ORDER_ADD_NEW_URL);
  }, [history]);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h3">Orders list</Typography>
      <div>
        <List component="nav">
          <Divider light />
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem button selected={false} disableRipple={true}>
                <ListItemText primary={order.order_number} />
                <IconButton onClick={() => handleListItemOnClick(order)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider light />
            </React.Fragment>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddButtonClick}>
          Add new order
        </Button>
      </div>
    </Paper>
  );
};

export default OrdersList;
