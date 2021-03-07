import React, { useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Left, Right } from 'utils/either';
import { notifySuccess } from 'utils/notifications';
import { useOrder, updateOrder } from 'sdk/order';
import { usePartList } from 'sdk/part';

import OrderForm from './OrderForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const OrderDetail = ({ match }) => {
  const id = match.params.id;

  const history = useHistory();
  const parts = usePartList();
  const order = useOrder(id);

  const handleSubmit = useCallback(
    (data) =>
      updateOrder(id, data)
        .then(() => Right(notifySuccess('Order saved!')))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      {order && (
        <OrderForm order={order} parts={parts} onSubmit={handleSubmit} />
      )}
    </Paper>
  );
};

export default OrderDetail;
