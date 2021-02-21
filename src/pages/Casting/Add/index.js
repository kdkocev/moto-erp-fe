import React, { useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import CastingForm from 'pages/Casting/Detail/CastingForm';
import { callUrl, post } from 'utils/sdk';
import { formatDatesInObjectForApi } from 'utils/dates';
import { BASE_URL, CASTING_LIST_URL } from 'config/urls';

import styles from './styles.module.css';

const AddCasting = ({ history }) => {
  const handleSubmit = useCallback(
    (data) => {
      return callUrl(
        post,
        `${BASE_URL}/casting`,
        formatDatesInObjectForApi(data)
      )
        .then(() => {
          history.push(CASTING_LIST_URL);
        })
        .catch(() => {});
    },
    [history]
  );

  return (
    <Paper className={styles.paper}>
      <CastingForm onSubmit={handleSubmit} />
    </Paper>
  );
};

export default AddCasting;
