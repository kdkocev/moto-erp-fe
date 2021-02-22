import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';

import { BASE_URL } from 'config/urls';
import { callUrl, get, patch } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import OrderForm from './OrderForm';

import styles from './styles.module.css';

const OrderDetail = ({ match }) => {
  const id = match.params.id;

  const [order, setOrder] = useState();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/order/${id}`).then(setOrder);
  }, [id]);

  const handleSubmit = useCallback(
    (data) => {
      callUrl(
        patch,
        `${BASE_URL}/order/${id}`,
        formatDatesInObjectForApi(data)
      );
    },
    [id]
  );

  return (
    <Paper className={styles.paper}>
      {order && <OrderForm order={order} onSubmit={handleSubmit} />}
    </Paper>
  );
};

export default OrderDetail;
