import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';

import BackButton from 'components/BackButton';
import ExpeditionForm from 'pages/Expedition/components/ExpeditionForm';
import { Left, Right } from 'utils/either';
import { formatDatesInObjectForApi } from 'utils/dates';
import { callLink } from 'utils/links';
import { EXPEDITION_LIST_URL } from 'config/urls';
import { createExpedition } from 'sdk/expedition';
import { useOrderList } from 'sdk/order';

import styles from './styles.module.css';

const AddExpedition = ({ history }) => {
  const orders = useOrderList();

  const handleSubmit = useCallback(
    (data) =>
      createExpedition(formatDatesInObjectForApi(data))
        .then(() => Right(callLink(history, EXPEDITION_LIST_URL)))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton />
      <ExpeditionForm onSubmit={handleSubmit} orders={orders} />
    </Paper>
  );
};

export default AddExpedition;
