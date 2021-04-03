import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';

import BackButton from 'components/BackButton';
import MachinedPartsForm from 'pages/MachinedParts/components/MachinedPartsForm';
import { Left, Right } from 'utils/either';
import { formatDatesInObjectForApi } from 'utils/dates';
import { callLink } from 'utils/links';
import { MACHINED_PARTS_LIST_URL } from 'config/urls';
import { createMachinedParts } from 'sdk/machinedParts';
import { usePartList } from 'sdk/part';

import styles from './styles.module.css';

const AddMachinedParts = ({ history }) => {
  const parts = usePartList();

  const handleSubmit = useCallback(
    (data) =>
      createMachinedParts(formatDatesInObjectForApi(data))
        .then(() => Right(callLink(history, MACHINED_PARTS_LIST_URL)))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton />
      <MachinedPartsForm onSubmit={handleSubmit} parts={parts} />
    </Paper>
  );
};

export default AddMachinedParts;
