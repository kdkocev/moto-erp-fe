import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { BASE_URL } from 'config/urls';
import { callUrl, get, patch } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import OrderForm from './OrderForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const OrderDetail = ({ match }) => {
  const id = match.params.id;

  const [order, setOrder] = useState();
  const [parts, setParts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/order/${id}`).then(setOrder);
  }, [id]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/part`).then(setParts);
  }, []);

  const handleSubmit = useCallback(
    (data) =>
      callUrl(
        patch,
        `${BASE_URL}/order/${id}`,
        formatDatesInObjectForApi(data)
      ).then(() => setIsSuccess(true)),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      {isSuccess && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isSuccess}
          onClose={() => {
            setIsSuccess(false);
          }}>
          <Alert
            onClose={() => {
              setIsSuccess(false);
            }}
            elevation={6}
            variant="filled"
            severity="success">
            Order saved!
          </Alert>
        </Snackbar>
      )}
      {order && (
        <OrderForm order={order} parts={parts} onSubmit={handleSubmit} />
      )}
    </Paper>
  );
};

export default OrderDetail;
