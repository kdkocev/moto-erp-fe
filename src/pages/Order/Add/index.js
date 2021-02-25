import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import OrderForm from 'pages/Order/Detail/OrderForm';
import { formatDatesInObjectForApi } from 'utils/dates';
import { callLink } from 'utils/links';
import { ORDER_LIST_URL } from 'config/urls';
import { createOrder } from 'sdk/order';
import { usePartList } from 'sdk/part';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const AddOrder = ({ history }) => {
  const parts = usePartList();

  const handleSubmit = useCallback(
    (data) =>
      createOrder(formatDatesInObjectForApi(data))
        .then(() => callLink(history, ORDER_LIST_URL))
        .catch(() => {}),
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <OrderForm onSubmit={handleSubmit} parts={parts} />
    </Paper>
  );
};

export default AddOrder;
