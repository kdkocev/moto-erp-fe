import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';

import BackButton from 'components/BackButton';
import { Left, Right } from 'utils/either';
import { notifySuccess } from 'utils/notifications';
import { useExpedition, updateExpedition } from 'sdk/expedition';
import { useOrderList } from 'sdk/order';

import ExpeditionForm from 'pages/Expedition/components/ExpeditionForm';

import styles from './styles.module.css';

const ExpeditionDetail = ({ match }) => {
  const id = match.params.id;

  const expedition = useExpedition(id);
  const orders = useOrderList();

  const handleSubmit = useCallback(
    (data) =>
      updateExpedition(id, data)
        .then(() => Right(notifySuccess('Expedition saved!')))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton />
      {expedition && (
        <ExpeditionForm
          expedition={expedition}
          orders={orders}
          onSubmit={handleSubmit}
        />
      )}
    </Paper>
  );
};

export default ExpeditionDetail;
