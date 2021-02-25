import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import SuccessAlert from 'components/SuccessAlert';
import { useCasting, updateCasting } from 'sdk/casting';

import CastingForm from './CastingForm';

import styles from './styles.module.css';

const BackButton = ({ onClick }) => (
  <Button onClick={onClick} startIcon={<ArrowBackIosIcon />}>
    Back
  </Button>
);

const CastingDetail = ({ match }) => {
  const id = match.params.id;

  const history = useHistory();
  const casting = useCasting(id);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(
    (data) =>
      updateCasting(id, data)
        .then(() => setIsSuccess(true))
        .catch(() => {}),
    [id]
  );

  return (
    <Paper className={styles.paper}>
      <BackButton onClick={() => history.goBack()} />
      <SuccessAlert
        open={isSuccess}
        onClose={() => setIsSuccess(false)}
        message="Casting saved!"
      />
      {casting && <CastingForm casting={casting} onSubmit={handleSubmit} />}
    </Paper>
  );
};

export default CastingDetail;
