import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import PartForm from 'pages/Part/Detail/PartForm';
import { Left, Right } from 'utils/either';
import { formatDatesInObjectForApi } from 'utils/dates';
import { callLink } from 'utils/links';
import { PART_LIST_URL } from 'config/urls';
import { createPart } from 'sdk/part';
import { useCastingList } from 'sdk/casting';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const AddPart = ({ history }) => {
  const castings = useCastingList();
  const handleSubmit = useCallback(
    (data) =>
      createPart(formatDatesInObjectForApi(data))
        .then(() => Right(callLink(history, PART_LIST_URL)))
        .catch((error) => Left(_.get(error, 'data', {}))),
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <PartForm onSubmit={handleSubmit} castings={castings} />
    </Paper>
  );
};

export default AddPart;
