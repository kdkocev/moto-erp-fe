import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import OrderForm from 'pages/Order/Detail/OrderForm';
import { callUrl, post, get } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import { BASE_URL, ORDER_LIST_URL } from 'config/urls';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const AddOrder = ({ history }) => {
  const [parts, setParts] = useState([]);

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

  useEffect(() => {
    callUrl(get, `${BASE_URL}/part`).then(setParts);
  }, []);

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <OrderForm onSubmit={handleSubmit} parts={parts} />
    </Paper>
  );
};

export default AddOrder;
