import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import OrderForm from 'pages/Order/Detail/OrderForm';
import { callUrl, post } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import { BASE_URL, ORDER_LIST_URL } from 'config/urls';

import styles from './styles.module.css';

const AddOrder = ({ history }) => {
  const handleSubmit = useCallback(
    (data) => {
      return callUrl(post, `${BASE_URL}/order`, formatDatesInObjectForApi(data))
        .then(() => {
          history.push(ORDER_LIST_URL);
        })
        .catch(() => {});
    },
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <OrderForm onSubmit={handleSubmit} />
    </Paper>
  );
};

export default AddOrder;
