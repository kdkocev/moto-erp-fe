import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import ExpeditionForm from 'pages/Expedition/components/ExpeditionForm';
import { Left, Right } from 'utils/either';
import { formatDatesInObjectForApi } from 'utils/dates';
import { callLink } from 'utils/links';
import { t } from 'utils/translate';
import { EXPEDITION_LIST_URL } from 'config/urls';
import { createExpedition } from 'sdk/expedition';
import { useOrderList } from 'sdk/order';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    {t('Back', 'Назад')}
  </Button>
);

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
      <BackButton onClick={() => history.goBack()} />
      <ExpeditionForm onSubmit={handleSubmit} orders={orders} />
    </Paper>
  );
};

export default AddExpedition;
