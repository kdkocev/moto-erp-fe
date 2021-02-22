import React, { useCallback, useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import PartForm from 'pages/Part/Detail/PartForm';
import { callUrl, post, get } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import { BASE_URL, PART_LIST_URL } from 'config/urls';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const AddPart = ({ history }) => {
  const handleSubmit = useCallback(
    (data) => {
      return callUrl(post, `${BASE_URL}/part`, formatDatesInObjectForApi(data))
        .then(() => {
          history.push(PART_LIST_URL);
        })
        .catch(() => {});
    },
    [history]
  );

  const [castings, setCastings] = useState([]);
  useEffect(() => {
    callUrl(get, `${BASE_URL}/casting`).then(setCastings);
  }, []);

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <PartForm onSubmit={handleSubmit} castings={castings} />
    </Paper>
  );
};

export default AddPart;
