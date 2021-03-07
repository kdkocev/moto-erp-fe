import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Left, Right } from 'utils/either';
import { notifySuccess } from 'utils/notifications';
import { usePart, updatePart } from 'sdk/part';
import { useCastingList } from 'sdk/casting';

import PartForm from './PartForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const PartDetail = ({ match }) => {
  const id = match.params.id;

  const history = useHistory();
  const part = usePart(id);
  const castings = useCastingList();

  const handleSubmit = useCallback(
    (data) =>
      updatePart(id, data)
        .then(() => Right(notifySuccess('Part saved!')))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      {part && (
        <PartForm part={part} castings={castings} onSubmit={handleSubmit} />
      )}
    </Paper>
  );
};

export default PartDetail;
