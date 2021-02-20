import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';

import { BASE_URL } from 'config/urls';
import { callUrl, get } from 'utils/sdk';
import OrderForm from './OrderForm';

import styles from './styles.module.css';

const OrderDetail = ({ match }) => {
  const id = match.params.id;

  const [order, setOrder] = useState();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/order/${id}`).then(setOrder);
  }, [id]);

  return (
    <Paper className={styles.paper}>
      {order && <OrderForm order={order} />}
    </Paper>
  );
};

export default OrderDetail;
