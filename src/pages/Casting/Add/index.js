import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import CastingForm from 'pages/Casting/Detail/CastingForm';
import { CASTING_LIST_URL } from 'config/urls';
import { callLink } from 'utils/links';
import { createCasting } from 'sdk/casting';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const AddCasting = ({ history }) => {
  const handleSubmit = useCallback(
    (data) =>
      createCasting(data)
        .then(() => callLink(history, CASTING_LIST_URL))
        .catch(() => {}),
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <CastingForm onSubmit={handleSubmit} />
    </Paper>
  );
};

export default AddCasting;
