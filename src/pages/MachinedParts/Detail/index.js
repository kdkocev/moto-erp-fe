import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';

import BackButton from 'components/BackButton';
import { Left, Right } from 'utils/either';
import { notifySuccess } from 'utils/notifications';
import { useMachinedParts, updateMachinedParts } from 'sdk/machinedParts';
import { usePartList } from 'sdk/part';

import MachinedPartsForm from 'pages/MachinedParts/components/MachinedPartsForm';

import styles from './styles.module.css';

const MachinedPartsDetail = ({ match }) => {
  const id = match.params.id;

  const machinedParts = useMachinedParts(id);
  const parts = usePartList();

  const handleSubmit = useCallback(
    (data) =>
      updateMachinedParts(id, data)
        .then(() => Right(notifySuccess('Machined Parts saved!')))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton />
      {machinedParts && (
        <MachinedPartsForm
          machinedParts={machinedParts}
          parts={parts}
          onSubmit={handleSubmit}
        />
      )}
    </Paper>
  );
};

export default MachinedPartsDetail;
