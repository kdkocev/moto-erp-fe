import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';

import { BASE_URL } from 'config/urls';
import { callUrl, get, patch } from 'utils/sdk';
import PartForm from './PartForm';

import styles from './styles.module.css';

const PartDetail = ({ match }) => {
  const id = match.params.id;

  const [part, setPart] = useState();

  useEffect(() => {
    callUrl(get, `${BASE_URL}/part/${id}`).then(setPart);
  }, [id]);

  const handleSubmit = useCallback(
    (data) => {
      callUrl(patch, `${BASE_URL}/part/${id}`, data);
    },
    [id]
  );

  return (
    <Paper className={styles.paper}>
      {part && <PartForm part={part} onSubmit={handleSubmit} />}
    </Paper>
  );
};

export default PartDetail;
