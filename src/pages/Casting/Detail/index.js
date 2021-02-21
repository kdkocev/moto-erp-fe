import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';

import { BASE_URL } from 'config/urls';
import { callUrl, get, patch } from 'utils/sdk';
import CastingForm from './CastingForm';

import styles from './styles.module.css';

const CastingDetail = ({ match }) => {
  const id = match.params.id;

  const [casting, setCasting] = useState();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/casting/${id}`).then(setCasting);
  }, [id]);

  const handleSubmit = useCallback(
    (data) => {
      callUrl(patch, `${BASE_URL}/casting/${id}`, data);
    },
    [id]
  );

  return (
    <Paper className={styles.paper}>
      {casting && <CastingForm casting={casting} onSubmit={handleSubmit} />}
    </Paper>
  );
};

export default CastingDetail;
